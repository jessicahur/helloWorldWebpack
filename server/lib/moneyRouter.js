const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

var router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, response) => {
  http.get('http://openexchangerates.org/api/latest.json?app_id=fb4db514dcda4cce9452221d5993cc04', (res) => {
    console.log(res.data);
    response.send();
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });

});

module.exports = router;
