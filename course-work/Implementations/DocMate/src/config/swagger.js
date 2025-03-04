const path = require('path');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// const yaml = require('yaml')
// const fs = require("fs")

// Backup if swagger randomly dies on me again
// const absoluteFPath = path.join(__dirname, '..', 'utils', 'openapi.yaml');
// const file  = fs.readFileSync(absoluteFPath, 'utf8')
// const swaggerDocument = yaml.parse(file)

const routesPath = path.join(__dirname, '..', 'routes', '*.js');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DocMate API',
      version: '1.0.0',
      description: 'API for the doctor-client management platform DocMate'
    },
    servers: [
      {
        url: 'http://localhost:3000/api/',
        description: "local",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      // No schemas it was ugly
    },
    security: [{ bearerAuth: [] }]
  },
  apis: [routesPath],
};

const swaggerConfig = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerConfig);
  });
};

module.exports = setupSwagger;