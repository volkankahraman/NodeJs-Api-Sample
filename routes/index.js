const express = require('express')
const jwt = require('jsonwebtoken')

let router = express.Router();

router.get('/', function (req, res) {
    res.json({
        message: "Todo uygulaması API'si"
    })
})

router.post('/getToken', function (req, res) {
    jwt.sign({data:'token'}, process.env.TOKEY_KEY, function (err,token) {
        if(err){
            next(err);
        }else{
            res.json({token: token});
        }
    });
})

module.exports = router;


/**
 * @swagger
 * /:
 *    get:
 *      description: ana route
 *      responses:
 *        '200':
 *          description: OK
 *        '404':
 *          description: Not Found
 *        '500':
 *          description: Internal Error
 */

/**
* @swagger
* /getToken:
*    post:
*      description: token döner
*      responses:
*        '200':
*          description: OK
*        '404':
*          description: Not Found
*        '500':
*          description: Internal Error
*/