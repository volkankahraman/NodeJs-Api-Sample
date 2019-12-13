require('dotenv').config();

const express = require('express')
const app = express()
const swaggerUI = require('swagger-ui-express')
const swagger = require('./docs/swagger')
const middleware = require('./middlewares')


const todosRouter = require('./routes/todos')
const indexRouter = require('./routes/index')


let PORT = process.env.PORT;

//Middleware

middleware(app);

//Route

app.use('/todos', todosRouter);
app.use('/', indexRouter);

// Docs

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

// 404 endpoint

app.use(function (req, res) {
    res.status(404).json({
        error: "404 Bulunamadı!"
    })
})

//Error handling
app.use(function (err, req, res, next) {
    if (err){
        res.status(500).json({
            error: "Sunucu hatası "+err
        })
    }
})



// Listening port
app.listen(PORT, function () {
    console.log(`Sunucu ${ PORT } portu üzerinden dinleniyor...
    http://localhost:${ PORT }`)
})

module.exports = app;