const swaggerJSDoc = require('swagger-jsdoc');

const swaggerSetups = () => {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Planner API',
      version: '1.0.0',
      description:
        "This is a REST API application made with Express. It's convenient daily task planner.",
      license: {
        name: 'Licensed Under: "Ja Tebe Najdy Inc. :)"',
      },
      contact: {
        name: 'GooseTrack Team Project',
        url: 'https://serjkenri.github.io/goosetrack-team-project-front/',
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: process.env.DEV_URL,
        description: 'Development server',
      },
    ],
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/api/*.js', './service/swaggerDocs/*.yaml'],
  };

  const swaggerSpec = swaggerJSDoc(options);
  return swaggerSpec;
};

module.exports = {
  swaggerSetups,
};
