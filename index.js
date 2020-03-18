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

io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  socket.on("disconnect", function() {
    io.sockets.emit("disconnected", "disconnected");
  });
});

// Api / Backend work below this point
app.use('/user', require('./Api/User'))
