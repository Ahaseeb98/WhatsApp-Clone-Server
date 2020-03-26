const mongoose = require("mongoose");
const Chat = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  reply_id: {
    type: String
  },
  video: {
    type: String
  },
  image: {
    type: String
  },
  chatroom_id: {
    type: String
  },
  createdAt: {
    type: Number,
    default: new Date().getTime()
  }
});

module.exports = mongoose.model("chats", Chat);
