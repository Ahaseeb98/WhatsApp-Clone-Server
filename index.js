var express = require("express");
var socket = require("socket.io");
const db = require("./Config");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const cors = require("cors");
var app = express();
app.use(bodyParser.json()); //Body Parser MiddleWare
app.use(express.json());
app.use(cors());
app.use(bodyParser());

app.use(express.static("public"));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024123 }
  })
);

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
]

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

    console.log(data)
    chat_arr.push(data[0])
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
