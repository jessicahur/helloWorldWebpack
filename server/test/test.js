const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;

const app = require('../lib/app');
const Employee = require('../model/Employee');
const expect = chai.expect;

const mongoose = require('mongoose');

chai.use(chaiHttp);

describe ('Mongo-Mongoose', () => {
  before((done) => {
    const db = mongoose.connection;
    mongoose.connect('mongodb://localhost/test');
    db.once('open', () => {
      Employee.remove({"_id": "testing"}, () => {
        done();
      });
    });
  });

  //POST
  it('should post the json employee to database and return the json obj back', (done) => {
    var testJson = {
          _id: "testing",
          name: "testing",
          username: "testing",
          DOB: "2000-01-01",
          address: "testing",
          phone: "999-999-9999",
          email: "test@testing.com",
          position: "accountant"
        }
    chai.request(app)
        .post('/api/employees')
        .send(testJson)
        .end((err, res) => {
          expect(err).to.be.null;
          var receivedObj = res.body;
          receivedObj.DOB = receivedObj.DOB.substr(0, 10);
          Object.keys(testJson).forEach((key) => {
            assert.equal(testJson[key], receivedObj[key], `it failed at ${key}`);
          });
          done();
        });
  });

  //Data Validation
  it('should receive status 400 trying to post the wrong phone format', (done) => {
    var testJson = {
      _id: "testing",
      name: "testing",
      username: "testing",
      DOB: "2000-01-01",
      address: "testing",
      phone: "99-999-9999",
      email: "test@testing.com",
      position: "accountant"
    };
    chai.request(app)
        .post('/api/employees')
        .send(testJson)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
  });

  it('should receive status 400 trying to post the wrong position option', (done) => {
    var testJson = {
      _id: "testing",
      name: "testing",
      username: "testing",
      DOB: "2000-01-01",
      address: "testing",
      phone: "99-999-9999",
      email: "test@testing.com",
      position: "Testing"
    };
    chai.request(app)
        .post('/api/employees')
        .send(testJson)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
  });

  //GET
  it('should get an array of json objects back with /GET', (done) => {
    chai.request(app)
        .get('/api/employees')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.length).to.not.be.undefined;
          done();
        });
  });

  //GET Specific Id
  it('should return a json object that has id matching the requested id', (done) => {
    chai.request(app)
        .get('/api/employees/testing')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body['_id']).to.equal('testing');
          done();
        });
  });

  //DELETE
  it('should receive the deleted object that has the requested id', (done) => {
    chai.request(app)
        .delete('/api/employees/testing')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.body['_id']).to.equal('testing');
          done();
        });
  });


});

