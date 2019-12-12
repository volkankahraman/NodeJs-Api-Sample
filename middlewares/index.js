//const express = require('express');
const logger = require('morgan')('dev')
const bodyParser = require('body-parser')



function Middlewares(app) {
    app.use(logger)

    app.use(bodyParser.json())

    app.use(bodyParser.urlencoded({
        extended :true
    }))
}

module.exports = Middlewares;
