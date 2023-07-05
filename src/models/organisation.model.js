const mongoose = require('mongoose');
const DbService = require('./data.service');


const orgSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required']
  },

  application_server_ip: {
    type: String,
    required: [true, 'Server ip is required']
  },
  software_name: {
    type: String,
    required: [true, 'software name is required'],
  },
  institution_name: {
    type: String,
    required: [true, 'Institution name is required']
  },
  apikey: {
    type: String,
  },

  address: Object,
  created_on: {
    type: Date,
    default: Date.now()
  }
});


const Organisation = mongoose.model('Organisation', orgSchema);


module.exports = {
  Organisation,

}