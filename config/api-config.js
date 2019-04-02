var express = require("express");
var app = express();
var path  = require('path');
var dbfunc = require('./db-function');
var bodyParser = require('body-parser');
var UserRoute = require('../app/controllers/user.controller');
var AuthenticRoute = require('../app/controllers/authentic.controller');
var checkToken = require('./secureRoute');

// var schedule = require('node-schedule');

// var j = schedule.scheduleJob('*/1 * * * *', function(){
//   console.log('The answer to life, the universe, and everything!');
// });

dbfunc.connectionCheck.then((data) =>{
    //console.log(data);
 }).catch((err) => {
     console.log(err);
 });

 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

var router = express.Router();
app.use('/api',router);
AuthenticRoute.init(router);

var secureApi = express.Router();

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware

app.use('/secureApi',secureApi);
secureApi.use(checkToken);


app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something went wrong! Please try after sometime.');
});


// index route
app.get('/', (req,res) => {
    res.send('Welcome to admin Bitazza');
});

var ApiConfig = {
  app: app
};

UserRoute.init(secureApi);

module.exports = ApiConfig;
