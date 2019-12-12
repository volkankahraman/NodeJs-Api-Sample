require('dotenv').config();

const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swagger = require('./docs/swagger')
const middleware = require('./middlewares')


const todosRouter = require('./routes/todos')


let PORT = process.env.PORT;

//Middleware

middleware(app);

//Route

app.use('/todos', todosRouter);

// Docs

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

let message = {
    message: "Hello World"
};

app.get('/test', function (request, response) {
    response.json(message);
})

// 404 endpoint

app.use(function (req, res) {
    res.status(404).json({
        error: "404 Bulunamadı!"
    })
})

//Error handling
// res.json({
//     err: err.message
// });

// Listening port
module.exports = app;

app.listen(PORT, function () {
    console.log(`Sunucu ${ PORT } portu üzerinden dinleniyor...
http://localhost:${ PORT }`)
})
