const expect = require('chai').expect
const should = require('chai').should()
const request = require('supertest')

const app = require('./../server')
const db = require('./../databases/lowdb')

describe('Todo testi', function() {
    it('Veritabanında test todosu var',function () {

        let testTodo = db.get('todos')
        .find({
            id: 'oGgrRDnX'
        })
        .value()
        
        should.exist(testTodo);
    })
})

describe('Api Testi', function () {
    it('/todos  200 OK yanıt veriyor', function (done) {
        this.timeout(5000);
        request(app)
            .get("/todos")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                else done();
                process.exit(0);
            });

    })
})
