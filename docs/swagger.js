const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Todo Uygulaması',
            version: '1.0.0',
            description: 'Todo uygulaması için Rest Api endpointler',
            servers: ['http://localhost:3000']
        },
        basePath: '/'
    },
    apis:['./routes/*.js'],
}
const specs = swaggerJSDoc(options);

module.exports = specs;