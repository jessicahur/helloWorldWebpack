const express = require('express');

const router = require('./router');
const app = express();

app.use(express.static('public'));

app.use( (req, res, next) => {
  const url = '*';
  res.header( 'Access-Control-Allow-Origin', url );
  res.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
  next();
});

app.use('/employees',router);

app.use(function(req, res, next) {
  res.send('404 page not found for '+req.url);
});

// export default app
module.exports = app;


