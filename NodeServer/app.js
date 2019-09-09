// Base Modules
const express = require('express')
const app = express()
const chalk = require('chalk');
//Custome Modules
const envModule = require('./helper/env_info_module.js');
// App Constants
const constants = require('./constants');
// Login Page Routing
const authRoute = require('./route/auth')
// Home Page Routing
const homeRoute = require('./route/home')
//About Page Routing
const aboutRoute = require('./route/about')

//Route requests
app.use(express.static(__dirname + '/www'));
app.use('/', homeRoute)
app.use('/login', authRoute)
app.use('/about', aboutRoute)
//Other routes here
app.get('*', function(req, res){
   res.send(' PAGE NOT FOUND 404 ¯\_(ツ)_/¯  <br\>  <br\> Sorry, this is an invalid URL.');
});

//Starts Node Server at port SERVER_PORT
var server = app.listen(constants.SERVER_PORT, function () {

   //Read Test Environemnt
   envModule.getEnvironmentInfo();

   var host = server.address().address
   var port = server.address().port
   console.log(chalk.greenBright("Node Server started at http:", host, port))
})
