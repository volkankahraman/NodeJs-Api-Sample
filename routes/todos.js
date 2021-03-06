const express = require('express')
const shortid = require('shortid')
const db = require('./../databases/lowdb')
const authorize = require('./../authorization')

const router = express.Router();

router.get('/', function (req, res, next) {

    res.json(db.get('todos').value());

})

router.get('/:id', function (req, res) {
    let todo = db.get('todos')
        .find({
            id: req.params.id
        })
        .value();
    if(todo){
        res.json(todo);
    }else{
        next()
    }
})

router.post('/', function (req, res) {
    let todo = {
        id: shortid.generate(),
        todo: req.body.todo,
        date: new Date(),
        isDone: false
    };
    
    db.get('todos')
    .push(todo)
    .write()

    res.json({message:'Todo eklendi', todo});
})

router.put('/:id', authorize, function (req, res) {
    db.get('todos')
    .find({
        id: req.params.id
    })
    .assign({
        isDone: true
    })
    .write()

    let todo = db.get('todos').find({
        id: req.params.id
    })
    .value()


    res.json({ message:'Todo düzenlendi', todo})

})

router.delete('/:id', authorize, function (req, res, next) {
    let todo = db.get('todos').find({
        id: req.params.id
    }).value()
    if(todo){
        db.get('todos')
            .remove({
                id: req.params.id
            })
            .write()

        res.json({ message: 'Todo silindi'})
    }else{
        next()
    }

    
})


module.exports = router;


/**
 * @swagger
 * /todos:
 *    get:
 *      security:
 *      - bearerAuth: []
 *      description: Yapılacakları listeler
 *      responses:
 *        '200':
 *          description: OK
 *        '404':
 *          description: Not Found
 *        '401':
 *          description: Unauthorized
 *        '500':
 *          description: Internal Error
 */

/**
* @swagger
* /todos/{id}:
*    get:
*      parameters:
*         - name: id
*           description: Yapıcalak
*           in: path 
*      description: Idye göre yapılacak çeker
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
* /todos/{id}:
*    put:
*      parameters:
*         - name: id
*           description: Yapıcalak
*           in: path
*      description: Idye göre yapılacak çeker
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
* /todos/{id}:
*    delete:
*      parameters:
*         - name: id
*           description: Yapıcalak
*           in: path
*      description: Idye göre yapılacak çeker
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
 * /todos:
 *    post:
 *      parameters:
 *        - in: body
 *          name: todo
 *          description: Yapıcalak
 *
 *      description: Yapılacak ekler
 *      responses:
 *        '200':
 *          description: OK
 *        '404':
 *          description: Not Found
 *        '500':
 *          description: Internal Error
 */