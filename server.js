const express = require('express');
const path = require('path');
const fs = require('fs');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 8080;

// Ruta del archivo de configuración montado por ARO
const CONFIG_FILE_PATH = '/app/config/config.json';

let fileConfig = {};
try {
  if (fs.existsSync(CONFIG_FILE_PATH)) {
    const rawData = fs.readFileSync(CONFIG_FILE_PATH);
    fileConfig = JSON.parse(rawData);
    console.log(`Configuration loaded from ${CONFIG_FILE_PATH}`);
  }
} catch (error) {
  console.warn(`Could not read config file at ${CONFIG_FILE_PATH}, falling back to Environment Variables. Error: ${error.message}`);
}

// Helper para obtener configuración (Prioridad: Archivo > Env Var > Default)
const getConfig = (key, defaultValue) => {
  return fileConfig[key] || process.env[key] || defaultValue;
};

// Variables de entorno (del archivo o del sistema)
const INTERNAL_API_URL = getConfig('REACT_APP_API_URL', 'http://localhost:3000/api');
const ENVIRONMENT = getConfig('REACT_APP_ENVIRONMENT', getConfig('VITE_ENVIRONMENT', 'local'));
const AMSA_LOGIN_URL = getConfig('REACT_APP_AMSA_LOGIN_URL', getConfig('VITE_AMSA_LOGIN_URL', 'http://localhost:3000/login'));
const AMSA_LOGOUT_URL = getConfig('REACT_APP_AMSA_LOGOUT_URL', getConfig('VITE_AMSA_LOGOUT_URL', 'http://localhost:3000/logout'));

// Configurar Proxy para /api
app.use('/api', createProxyMiddleware({
  target: INTERNAL_API_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // Si la URL interna ya contiene '/api' al final, eliminamos '/api' del path de la petición
    // para evitar duplicados como http://backend/api/api/usuarios
    if (INTERNAL_API_URL.endsWith('/api')) {
      return path.replace(/^\/api/, '');
    }
    return path;
  },
  onProxyReq: (proxyReq, req, res) => {
    // console.log(`Proxying ${req.method} ${req.path} -> ${INTERNAL_API_URL}`);
  }
}));

// Servir archivos estáticos desde la carpeta dist
app.use(express.static(path.join(__dirname, 'dist')));

// Endpoint especial para config.js
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  
  // Para el frontend, la API siempre está en el mismo origen (proxy relativo)
  const config = {
    VITE_ENVIRONMENT: ENVIRONMENT,
    VITE_API_URL: '/api', // Forzamos relativo para usar el proxy
    VITE_AMSA_LOGIN_URL: AMSA_LOGIN_URL,
    VITE_AMSA_LOGOUT_URL: AMSA_LOGOUT_URL
  };

  res.send(`window.__ENV__ = ${JSON.stringify(config)};`);
});

// Para cualquier otra ruta, servir index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Proxy target for /api: ${INTERNAL_API_URL}`);
});
