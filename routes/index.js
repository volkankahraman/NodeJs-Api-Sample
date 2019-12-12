const express = require('express')
const jwt = require('jsonwebtoken')

let router = express.Router();

router.get('/', function (req, res) {
    res.json({
        message: "Todo uygulaması API'si"
    })
})

router.get('/getToken', function (req, res) {
    jwt.sign({data:'token'}, process.env.TOKEY_KEY, function (err,token) {
        if(err){
            next(err);
        }else{
            res.json({token: token});
        }
    });
})

module.exports = router;