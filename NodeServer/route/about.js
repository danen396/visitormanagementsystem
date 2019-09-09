const express = require('express')
const router = express.Router()
const chalk = require('chalk');

//Helper
var helper = require('../helper/mail_module.js');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log(chalk.yellowBright('About Route Time: ', Date.now()))
  next()
})

// define the About Page route
router.get('/', function (req, res) {
  res.send('Welcome to About US  ｡◕‿◕｡')
})
// define the Contact Route
router.get('/contact', function (req, res) {
  res.send('Sending Mail On :'+helper.sendMail())
})

module.exports = router
