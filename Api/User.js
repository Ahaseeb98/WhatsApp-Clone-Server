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
  let number = `+${req.query.contact_no}`;

  let splitNumber = number.split(" ");
  let mergeNumber = splitNumber[0] + splitNumber[1];
  if (req.query.contact_exist) {
    let num = ``;

    let splitNumberDash = number.split("-");
    splitNumberDash.map(v => {
      num += v;
    });
    let splitNumberPlusZero = num.split("+0");
    num = ``;
    splitNumberPlusZero.map(v => {
      num += v;
    });
    let splitNumberPlus = num.split("+");

    num = ``;
    splitNumberPlus.map(v => {
      num += v;
    });
    let splitNumberPlus92 = num.split("+92");

    num = ``;
    splitNumberPlus92.map(v => {
      num += v;
    });
    let splitNumberSpace = num.split(" ");

    number = `+92`;
    splitNumberSpace.map(v => {
      number += v;
    });
    var lastFive = "+92" + number.substr(number.length - 10); // => "Tabs1"

    mergeNumber = lastFive;
    // console.log("merge_fin", mergeNumber);
  }

  User.findOne({ contact_no: mergeNumber }, (err, data) => {
    if (data) console.log(data, mergeNumber, "login");
    if (err) {
      console.log("err", err);
      return;
    }
    if (data) {
      res.json(data);
    } else {
      res.json("User Has Not Registered!");
    }
  });
});

router.get("/get_user", (req, res) => {
  User.find((err, data) => {
    if (err) {
      console.log("err", err);
      return;
    }
    res.json(data);
  });
});

router.get("/contact_list", (req, res) => {
  console.log("req.query =>", req.query);

  User.find({ contact_no: req.query.contact_no })
    .then(success => {
      console.log(success, "while");
      res.json(success);
    })
    .catch(err => res.send(400).json(err));
});

router.get("/get_all_user", (req, res) => {
  console.log(req.query, "get User");
  User.find({}, (err, data) => {
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
