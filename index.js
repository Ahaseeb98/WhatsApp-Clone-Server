var express = require("express");
var socket = require("socket.io");
const db = require("./Config");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const cors = require("cors");

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
var app = express();
app.use(allowCrossDomain);
app.use(bodyParser.urlencoded());
app.use(express.static("public"));
app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024 //2MB max file(s) size
    }
  })
);
app.use(bodyParser.json());

app.use(cors());

db.connection
  .once("open", () => console.log("connected to db"))
  .on("error", err => console.log("error connecting db -->", err));

var server = app.listen(8000, function() {
  console.log("listening for requests on port 8000");
});

// Static files
app.use(express.static("public"));

var io = socket(server);

let chat_arr = [
  {
    _id: 1,
    text: "Hello developer",
    createdAt: new Date(),
    image: "https://placeimg.com/140/140/any",
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any"
    }
  },
  {
    _id: 2,
    text: "Hello ",
    createdAt: new Date(),
    user: {
      _id: 1,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any"
    }
  },
  {
    _id: 3,
    text: "Hello developer",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "React Native",
      avatar: "https://placeimg.com/140/140/any"
    }
  }
];

io.on("connection", socket => {
  console.log(
    "made socket connection",
    socket.id,
    socket.handshake.query.userId
  );

  socket.on("getChat/123", function() {
    io.sockets.emit("getChat/123", chat_arr);
  });

  socket.on("addChat/123", function(data) {
    // console.log(data)
    chat_arr.push(data[0]);
    io.sockets.emit("getChat/123", data);
  });

  socket.on("disconnect", function() {
    console.log(
      "disconnected",
      "disconnected",
      socket.id,
      socket.handshake.query.userId
    );
    io.sockets.emit(
      "disconnected",
      "disconnected",
      socket.id,
      socket.handshake.query.userId
    );
  });
});

// Api / Backend work below this point
app.use("/user", require("./Api/User"));
app.use("/chat", require("./Api/Chat"));

app.post("/add_images", (req, res) => {
  console.log("test", req.body);
  if (req.files === null) {
    console.log("err");
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files["images[]"];
  let imageArr = [];
  // file.map((v, i) => {
  //   let name = new Date().getTime() + i;
  //   v.mv(`${__dirname}/public/chat_img/${name}`, err => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).send("err", err);
  //     }
  //   });
  //   imageArr.push({ path: "chat_img/" + name });
  // });
  res.json(imageArr);
});
