const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatRoom = new mongoose.Schema({
  participant_1: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  participant_2: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  generatedOn: {
    type: Number,
    default: new Date().getTime(),
  },
  updatedAt: {
    type: String,
  },
});

module.exports = mongoose.model("chatrooms", ChatRoom);