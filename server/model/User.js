const mongoose = require( 'mongoose' );

var User = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  github: String
});
module.exports = mongoose.model('User', User);
