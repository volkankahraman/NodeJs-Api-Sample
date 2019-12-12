const expect = require('chai').expect
const should = require('chai').should()
const request = require('supertest')

const server = require('./../server')
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
    it('/todos  04 yanıt veriyor', function (done) {

       request(server)
        .get('/todoss')
        .expect(404, function () {
            done();
            process.exit(0);
        });
    })
})
