import axios, { AxiosResponse } from 'axios';
import { Express, Request, Response } from 'express';
import httpProxy from 'http-proxy';
import { randomBytes } from 'node:crypto';
import { Server } from 'node:http';

import { internalEndpoints } from '../constants/internalEndpoints/internalEndpoints';
import { EndpointInterface, isEndpointInterface } from '../interfaces/endpointInterfaces/EndpointInterface';
import { WebSocketInterface, isWebSocketInterface } from '../interfaces/endpointInterfaces/WebSocketInterface';

const wsProxy = httpProxy.createProxyServer({
  ws: true,
  changeOrigin: true,
  secure: true,
});

const queryParamsParserString = (url: URL) => {
  return url.searchParams.toString();
};
const paramsParserString = (req: Request) => {
  let paramsString: string = '/';

  for (const key in req.params) {
    paramsString += req.params[key];
  }

  if (paramsString === '/') {
    paramsString = '';
  }

  return paramsString;
};

const dateFormat = (): string => {
  const date = new Date();

  const year = `${date.getFullYear()}`;
  const month = `${String(date.getMonth() + 1).padStart(2, '0')}`;
  const day = `${String(date.getDate()).padStart(2, '0')}`;
  const hours = `${String(date.getHours()).padStart(2, '0')}`;
  const minutes = `${String(date.getMinutes()).padStart(2, '0')}`;
  const seconds = `${String(date.getSeconds()).padStart(2, '0')}`;
  const milliseconds = `${String(date.getMilliseconds()).padStart(3, '0')}`;

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
};
export function generateRandomHash(length = 32): string {
  return randomBytes(length).toString('hex');
}

const callbackBackHttp = async (apiUrl: string, endpoint: EndpointInterface, req: Request, res: Response) => {
  const pathBack = endpoint.pathBack(apiUrl);
  const parsedUrl = new URL(req.url, apiUrl);
  const paramsString = paramsParserString(req);

  const hashUnique = generateRandomHash(8);

  let axiosAction: Promise<AxiosResponse> | undefined = undefined;

  switch (endpoint.method) {
    case 'GET':
      axiosAction = axios.get(`${pathBack}${paramsString}${parsedUrl.search}`, {
        headers: req.headers,
      });
      break;
    case 'POST':
      axiosAction = axios.post(`${pathBack}${paramsString}${parsedUrl.search}`, req.body, {
        headers: req.headers,
      });
      break;
    case 'PUT':
      axiosAction = axios.put(`${pathBack}${paramsString}${parsedUrl.search}`, req.body, {
        headers: req.headers,
      });
      break;
    case 'DELETE':
      axiosAction = axios.delete(`${pathBack}${paramsString}${parsedUrl.search}`, {
        headers: req.headers,
      });
      break;
  }
  if (axiosAction == null) {
    res.status(500).send('Error en la configuracion del endpoint');
    return;
  }

  console.info(
    `[${dateFormat()}] [${hashUnique}] [INIT] [${endpoint.method}] - ${endpoint.pathFront} -> ${pathBack}${paramsString}${parsedUrl.search}`,
  );
  axiosAction
    .then((response) => {
      console.info(
        `[${dateFormat()}] [${hashUnique}] [ ${response.status}] [${endpoint.method}] - ${endpoint.pathFront} -> ${pathBack}${paramsString}${parsedUrl.search}`,
      );
      res.json(response.data);
    })
    .catch((error) => {
      const errorStatus = error.status || 500;
      console.error(
        `[${dateFormat()}] [${hashUnique}] [ ${errorStatus}] [${endpoint.method}] - ${endpoint.pathFront} -> ${pathBack}${paramsString}${parsedUrl.search}`,
      );
      res.status(errorStatus).send(error.response?.data || 'Error en la comunicacion con el servidor');
    });
};

export const configHttp: (app: Express, apiUrl: string) => { apis: string[] } = (app: Express, apiUrl: string) => {
  const keysEndpointsHttp = Object.keys(internalEndpoints).filter((value) =>
    isEndpointInterface(internalEndpoints[value]),
  );
  // Registrar las rutas en Express
  keysEndpointsHttp.forEach((key) => {
    const endpoint: EndpointInterface = internalEndpoints[key as keyof typeof internalEndpoints];
    const pathFront: string = endpoint.pathFront;

    //frontend
    switch (endpoint.method) {
      case 'GET':
        app.get(pathFront, (req: Request, res: Response) => {
          callbackBackHttp(apiUrl, endpoint, req, res);
        });
        break;
      case 'POST':
        app.post(pathFront, (req: Request, res: Response) => {
          callbackBackHttp(apiUrl, endpoint, req, res);
        });
        break;
      case 'PUT':
        app.put(pathFront, (req: Request, res: Response) => {
          callbackBackHttp(apiUrl, endpoint, req, res);
        });
        break;
      case 'DELETE':
        app.delete(pathFront, (req: Request, res: Response) => {
          callbackBackHttp(apiUrl, endpoint, req, res);
        });
        break;
    }
  });

  // Registrar las rutas en Express
  app.use('/api', (req, res) => {
    const url = `/api${req.path}`;

    const parsedUrl = new URL(req.url, apiUrl);
    const queryParams = queryParamsParserString(parsedUrl);
    const paramsString = paramsParserString(req);

    console.log('ENDPOINT NOT FOUND', req.method, url, paramsString, queryParams, req.body);
    return res.status(404).json({ message: 'ENDPOINT NOT FOUND (Internal)' });
  });

  return {
    apis: keysEndpointsHttp,
  };
};
export const configWebSocket: (server: Server, websocketUrl: string) => { apis: string[] } = (
  server: Server,
  websocketUrl: string,
) => {
  const keysEndpointsWebSocket = Object.keys(internalEndpoints).filter((value) =>
    isWebSocketInterface(internalEndpoints[value]),
  );
  keysEndpointsWebSocket.forEach((key) => {
    server.on('upgrade', (req, socket, head) => {
      if (!req.url) return;
      const parsedUrl = new URL(req.url, websocketUrl);

      const matchKey = keysEndpointsWebSocket.find((key) => {
        return internalEndpoints[key].pathFront === parsedUrl.pathname;
      });
      if (matchKey) {
        const match: WebSocketInterface = internalEndpoints[matchKey];
        const pathBack = match.pathBack(websocketUrl);

        const endpointFinal = `${pathBack}${parsedUrl.search}`;

        req.url = '/';

        // evitar "Unhandled 'error' event"
        socket.on('error', (err) => {
          console.log('⚠️ Socket error:', err.code || err.message);
        });

        socket.on('close', () => {
          console.log('🔌 Socket cerrado por el cliente o backend');
        });

        wsProxy.ws(req, socket, head, { target: endpointFinal });

        const hashUnique = generateRandomHash(8);

        console.info(
          `[${dateFormat()}] [${hashUnique}] [INIT] [WEBSOCKET] - ${match.pathFront} -> ${pathBack}${parsedUrl.search}`,
        );
      }
    });
  });

  wsProxy.on('error', (err, req, res) => {
    console.error('ERROR EN PROXY WS:', err.code);

    // Control especial según el error
    if (err.code === 'ECONNREFUSED') {
      console.log('❌ Backend WebSocket NO responde (ECONNREFUSED)');
    } else if (err.code === 'ETIMEDOUT') {
      console.log('⏱️ Timeout en conexión al backend WebSocket');
    }

    try {
      res.writeHead(502);
      res.end('WebSocket backend no disponible');
    } catch (ex) {
      console.error('ERROR al enviar respuesta de error por proxy WS:', ex);
      // Ignorar errores al cerrar la conexión
    }
  });

  return {
    apis: keysEndpointsWebSocket,
  };
};
