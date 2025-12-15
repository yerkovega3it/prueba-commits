import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Express } from "express";
import http from "http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ViteExpress from "vite-express";

import { configHttp, configWebSocket } from "../shared/express/proxyConfig";

dotenv.config();

const isRunDev = process.env.IS_RUN_DEV as "true" | "false" | undefined;
const nodeEnv = process.env.NODE_ENV as "development" | "production";
const vitePort = process.env.VITE_PORT
  ? parseInt(process.env.VITE_PORT, 10)
  : 3000;

// Normalizar variables de entorno para Vite (VITE_*) cuando se inyectan como REACT_APP_*
process.env.VITE_API_URL = process.env.VITE_API_URL || process.env.REACT_APP_API_URL;
process.env.VITE_AMSA_LOGIN_URL =
  process.env.VITE_AMSA_LOGIN_URL || process.env.REACT_APP_AMSA_LOGIN_URL;
process.env.VITE_AMSA_LOGOUT_URL =
  process.env.VITE_AMSA_LOGOUT_URL || process.env.REACT_APP_AMSA_LOGOUT_URL;
process.env.VITE_ENVIRONMENT =
  process.env.VITE_ENVIRONMENT || process.env.REACT_APP_ENVIRONMENT;

// Variables de entorno
const environmentVariables = {
  NODE_ENV: nodeEnv,
  VITE_PORT: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 8080,
  VITE_API_URL: process.env.REACT_APP_API_URL || process.env.VITE_API_URL,
  VITE_WS_URL: process.env.VITE_WS_URL,
  NODE_TLS_REJECT_UNAUTHORIZED: process.env.NODE_TLS_REJECT_UNAUTHORIZED,
  AMSA_LOGIN_URL:
    process.env.REACT_APP_AMSA_LOGIN_URL || process.env.VITE_AMSA_LOGIN_URL,
  AMSA_LOGOUT_URL:
    process.env.REACT_APP_AMSA_LOGOUT_URL || process.env.VITE_AMSA_LOGOUT_URL,
};

// Ignorar errores de certificados TLS
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Configuración de ViteExpress
ViteExpress.config({
  mode: environmentVariables.NODE_ENV,
});

// Crear la aplicación Express
const app: Express = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.disable("x-powered-by");

// Endpoint especial para config.js (cargado por index.html) para inyectar configuración en runtime.
app.get("/config.js", (_req, res) => {
  res.type("application/javascript");
  res.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  const config = {
    VITE_ENVIRONMENT:
      process.env.VITE_ENVIRONMENT ||
      process.env.NODE_ENV ||
      environmentVariables.NODE_ENV ||
      "development",
    VITE_API_URL: "/api",
    VITE_AMSA_LOGIN_URL: environmentVariables.AMSA_LOGIN_URL || "",
    VITE_AMSA_LOGOUT_URL: environmentVariables.AMSA_LOGOUT_URL || "",
  };

  res.send(`window.__ENV__ = ${JSON.stringify(config)};`);
});

app.get("/env", (_req, res) => {
  res.json({
    VITE_API_URL: process.env.VITE_API_URL,
    AMSA_LOGIN_URL: process.env.VITE_AMSA_LOGIN_URL,
    AMSA_LOGOUT_URL: process.env.VITE_AMSA_LOGOUT_URL,
  });
});

// Middleware para parsear JSON
app.use(express.json());

// Configuración de las rutas de proxy al backend
const { apis: apisHttp } = configHttp(
  app,
  environmentVariables.VITE_API_URL || ""
);

if (isRunDev !== "true") {
  console.log("dasdsa", isRunDev);

  // Ruta a la carpeta dist
  const __filename = fileURLToPath(import.meta.url);

  // Ruta a la carpeta dist
  const __dirname = path.dirname(__filename);

  // Servir archivos estáticos desde la carpeta dist
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));

  // Manejar todas las demás rutas para servir index.html (dist)
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const server = http.createServer(app);

const { apis: apisWebSocket } = configWebSocket(
  server,
  environmentVariables.VITE_WS_URL || ""
);

// 3. Conectar ViteExpress al server ya creado
ViteExpress.bind(app, server);

// Iniciar el servidor
server.listen(environmentVariables.VITE_PORT, () => {
  console.log("API Endpoints:", apisHttp.length);
  console.log("WEBSOCKET Endpoints:", apisWebSocket.length);
  console.log(
    `Server is listening in port ${environmentVariables.VITE_PORT}...`
  );
});
