const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({ //Future updates cannot alter id and username
  _id: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    require: true,
    unique: true,
    index: true
  },
  DOB: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: true,
    validate: {
      validator: function(value) {
        return /[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(value);
      },
      message: '{VALUE} is not a valid phone number!'
    }
  },
  email: {
    type: String,
    require: true,
    match: /.+\@.+\..+/
  },
  position: {
    type: String,
    require: true,
    enum: ['manager', 'accountant', 'engineer', 'receptionist']
  }
});

module.exports = mongoose.model('Employee', Employee);
