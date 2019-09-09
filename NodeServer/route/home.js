const express = require('express')
const router = express.Router()
const chalk = require('chalk');

// Request path module for relative path
const path = require('path')
// Request File System Module
var fs = require('fs');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log(chalk.yellowBright('Home Route Entry Time: ', Date.now()))
  next()
})

// GET request for the homepage
router.get('/', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Welcome to Home Page  ( ͡° ͜ʖ ͡°)');
})

// POST request for the homepage
router.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// DELETE request for the /del_user page.
router.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// GET request for the /list_user page.
router.get('/listUsers', function (req, res) {
   console.log("Got a GET request for list of users");

    //Read JSON from relative path of this file
    let reqPath = path.join(__dirname, '../mock/users.json');
    fs.readFile(reqPath , 'utf8', function (err, data) {
        //Handle Error
       if(!err) {
         //Handle Success
          console.log("Success"+data);
         // Parse Data to JSON OR
          var jsonObj = JSON.parse(data)
         //Send back as Response
          res.end( data );
        }else {
           res.end("Error: "+err )
        }
   });
})

// SHOW ALL API
router.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})

module.exports = router
