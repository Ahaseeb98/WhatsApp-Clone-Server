const express = require("express");
const router = express.Router();

const Chat = require("../Models/Chat");

router.get("/get_chat", (req, res) => {
  console.log(req.query, "get Chat");
  Chat.findOne({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log("err", err);
      return;
    }
    res.json(data);
  });
});
module.exports = router;
