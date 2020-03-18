const mongoose = require("mongoose");

// connection URI
const mongoURI = "mongodb://user1:user69@ds133533.mlab.com:33533/whatsapp99";
// remove deprecation warning of collection.ensureIndex
mongoose.set('useCreateIndex', true);
// connect to mongodb
mongoose.connect(mongoURI, {useNewUrlParser: true})

module.exports = mongoose;