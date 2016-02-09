const mongoose = require('mongoose');
const db = mongoose.connection;
const app = require('./lib/app');

mongoose.connect('mongodb://localhost/test');

var test = new Employee({
    _id: 12,
    name: 'Test',
    username: postedEmployee.username,
    DOB: new Date(postedEmployee.DOB),
    email: postedEmployee.email,
    address: postedEmployee.address,
    phone: postedEmployee.phone,
    position: postedEmployee.position
  });
