const express = require('express')
const shortid = require('shortid')
const db = require('./../databases/lowdb')


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

router.put('/:id', function (req, res) {
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

router.delete('/:id', function (req, res, next) {
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
 *      description: Yapılacakları listeler
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