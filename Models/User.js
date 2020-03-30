const mongoose = require("mongoose");
const User = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    // required: true
  },
  contact_no: {
    type: String,
    required: true
  },
  about: {
    type: String
  },
  avatar: {
    type: String
  },
  online: {
    type: Boolean,
    default: true
  },
  status: {
    type: String
  },
  confirmation_code: {
    type: String
  },
  notification_key: {
    type: String
  },
  generatedOn: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model("users", User);
