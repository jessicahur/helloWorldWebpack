const express = require('express');
const methodOverride = require( 'method-override' );
const bodyParser = require( 'body-parser' );
const moment = require( 'moment' );
const jwt = require( 'jwt-simple');

const router = require('./router');
const app = express();

// var config = require('../config');
const auth = require( './auth.js' );

/*
 |--------------------------------------------------------------------------
 | Login Required Middleware
 |--------------------------------------------------------------------------
 */
function ensureAuthenticated(req, res, next) {

  if ( req.method === 'OPTIONS' ) return next(); //Pass this to router. Our router doesn't have any method hat deals with OPTIONS request

  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];

  var payload = null;
  try {
    payload = jwt.decode(token, process.env.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}

app.use(express.static('public'));

app.use( (req, res, next) => {
  const url = '*';
  res.header( 'Access-Control-Allow-Origin', url );
  // res.header( 'Access-Control-Allow-Credentials', true );
  res.header( 'Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
  next();
});

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( methodOverride() );

app.use( '/auth', auth );
app.use('/api/employees', ensureAuthenticated, router);


app.use(function(req, res, next) {
  res.send('404 page not found for '+req.url);
});

// export default app
module.exports = app;


