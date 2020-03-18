const express = require("express");
const router = express.Router();

const User = require("../Models/User");

router.post("/add_user", (req, res) => {
  console.log(req.body, "add User");
  let user = new User(req.body);
  user
    .save()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).send("err", err);
    });
});

router.get("/get_user", (req, res) => {
  console.log(req.query, "get User");
  User.findOne({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log("err", err);
      return;
    }
    res.json(data);
  });
});

router.post("/confirm_user", (req, res) => {
  console.log(req.query, "confirmation code User");
  User.findOne({ _id: req.query._id }, (err, data) => {
    if (err) {
      console.log("err", err);
      return;
    }
    data.confirmation_code = "some_code";
    data
      .save()
      .then(code => {
        res.json(code);
      })
      .catch(err => {
        console.log("err", err);
        res.status(500).send("err", err);
      });
  });
});

module.exports = router;
