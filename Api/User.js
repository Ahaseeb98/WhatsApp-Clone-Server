const express = require("express");
const router = express.Router();

const User = require("../Models/User");

router.post("/add_user", (req, res) => {
  console.log(req.body, "add User");

  if (req.files !== null) {
    const file = req.files["images[]"];
    file.map((v, i) => {
      let name = new Date().getTime() + i;
      v.mv(`${__dirname}/public/avatar/${name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send("err", err);
        }
      });
      // imageArr.push({ path: "avatar/" + name });
      req.body.avatar = "avatar/" + name;
    });
  }
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

router.post("/update_user", (req, res) => {
  console.log(req.body, "add User");

  if (req.files !== null) {
    const file = req.files["images[]"];
    file.map((v, i) => {
      let name = new Date().getTime() + i;
      v.mv(`${__dirname}/public/avatar/${name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send("err", err);
        }
      });
      // imageArr.push({ path: "avatar/" + name });
      req.body.avatar = "avatar/" + name;
    });
  }
  User.findOne({ _id: req.body._id })
    .then(data => {
      data.first_name = req.body.first_name;
      data.last_name = req.body.last_name;
      data.avatar = req.body.avatar;
      data.save().then(user => {
        res.json(user);
      });
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).send("err", err);
    });
});

router.get("/login", (req, res) => {
  console.log(req.query, "login User");
  User.findOne({ contact_no: req.query.contact_no }, (err, data) => {
    if (err) {
      console.log("err", err);
      return;
    }
    if (data) {
      res.json(data);
    } else {
      res.json("User Already Exists");
    }
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
