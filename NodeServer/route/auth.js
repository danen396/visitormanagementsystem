const express = require('express')
const router = express.Router()
const chalk = require('chalk');


//Helper
var mailModule = require('../helper/mail_module.js');
var dbModule = require('../helper/db_module.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log(chalk.yellowBright('Auth Route Time: ', Date.now()))
  next()
})

// define the About Page route
router.get('/', function (req, res) {
  res.send('Welcome to Login Page')
  //Create Connection DB
  dbModule.connectToDB();

  //Create Connection DB
  dbModule.createRecord();
})

router.get('/:id/:pass', function(req, res){
   res.send('Login The id you specified is ' + req.params.id
           +' <br\> <br\> Pass is '+req.params.pass );
});

// define the Contact Route
router.get('/signup', function (req, res) {
  res.send('Requesting Sign Up')
})

// define the Contact Route
router.get('/forgot_pass', function (req, res) {
  res.send('Requesting New password')
})


module.exports = router
