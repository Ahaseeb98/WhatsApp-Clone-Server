const mongoose = require("mongoose");
const ChatRoom = new mongoose.Schema({
  participant_1: {
    type: String,
    required: true
  },
  participant_2: {
    type: String,
    required: true
  },
  generatedOn: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model("chatrooms", ChatRoom);
