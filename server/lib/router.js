'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
//connect to mongoose and open a connection to the test database on local MongoDB

const Employee = require('../model/Employee');
const router = express.Router();

router.use(bodyParser.json());

//POST
router.post('/', (req, res, next) => {

  var postedEmployee = req.body;

  if (!Object.keys(postedEmployee).length) return res.status(400).send('Wrong input format');

  var newEmployee = new Employee({
    _id: postedEmployee._id,
    name: postedEmployee.name,
    username: postedEmployee.username,
    DOB: new Date(postedEmployee.DOB),
    email: postedEmployee.email,
    address: postedEmployee.address,
    phone: postedEmployee.phone,
    position: postedEmployee.position
  });

  newEmployee.save((err, savedEmployee) => {
    if (err) {
      console.log(err);
      return res.status(400).send(err);
    }
    res.send(savedEmployee);
  });

});

//General GET
router.get('/', (req, res, next) => {
  Employee.find({}).lean().exec( (err, employees) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.send(employees);
  });

});

//Specific get
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Employee.findById(id, (err, employee) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(employee);
  });
});

//DELETE
router.delete('/:id', (req, res, next) => {
  Employee.where().findOneAndRemove({'_id': req.params.id}, {}, (err, removedEmployee) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.send(removedEmployee);
  });
});

//PUT & PATCH
router.all('/:id', (req, res, next) => {
  var id = req.params.id;
  var update = req.body;
  update.DOB = new Date(update.DOB);

  Employee.findByIdAndUpdate(id, update, {runValidators: true, multi: false}, (err, numAffected) => {
    if (err) {
      res.status(400).send(err);
      return console.error(err);
    }

    Employee.findById(req.params.id, (err, employee) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.send(employee);
    });

  });
});
// router.all('/:id', (req, res, next) => {
//   var id = req.params.id;
//   var update = req.body;
//   update.DOB = new Date(update.DOB);

//   Employee.findByIdAndUpdate(id, update, {runValidators: true, multi: false}, (err, numAffected) => {
//     if (err) {
//       res.status(400).send(err);
//       return console.log(err);
//     }

//     Employee.findById(req.params.id, (err, employee) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send(err);
//       }
//       res.send(employee);
//     });

//   });
// });

module.exports = router;


