const jwt = require('jsonwebtoken')

function authorize(req, res, next) {
    const Header = req.header('Authorization');
    if (Header) {
        let token = req.headers.authorization;
        jwt.verify(token, process.env.TOKEY_KEY, function (err, decoded) {
            if(err){
                // Yetkisiz istek
                res.sendStatus(401)
            }else{
                next()
            }
        })

    } else {
        res.sendStatus(401);
    }
}

module.exports = authorize;