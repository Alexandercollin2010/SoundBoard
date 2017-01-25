var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var path = require("path");

// middleware
app.use(bodyParser.json());
app.use(express.static('public'));

//require routers
var indexRouter = require('./server/routes/index');
console.log(indexRouter);
app.use('/', indexRouter);
// var registerRouter = require('./routes/register');
// console.log(registerRouter);
// var loginRouter = require('./routes/login');
// console.log(loginRouter);
// var profileRouter = require('./server/routes/profile');
// console.log(profileRouter);
// app.use('/', profileRouter);

// app.get("/", function(req, res){
//     console.log(req.params);
//     var file = req.params[0] || "public/views/index.html";
//     res.sendFile(path.join(__dirname, "/", file));
// });

// server port set and listen
var serverPort = process.env.port || 3000;
app.set('port', serverPort);

var server = app.listen(serverPort, function() {
  console.log('up and listening on', server.address().port);
});

// connect to the mongodb
var mongoURI = "mongodb://localhost:27017/soundboard";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});
