const mongoose = require('mongoose');
const db = mongoose.connection;
const app = require('./lib/app');
const Grid = require('gridfs-stream');

mongoose.connect('mongodb://localhost/test');

db.on('error', err => {
  console.log(err);
  db.close();
});

db.once( 'open', () => {

  var gfs = Grid(db.db, mongoose.mongo);
  console.log('Database connected');
  app.listen(3000, console.log('Server has started. Listening at port 3000...'))

});
