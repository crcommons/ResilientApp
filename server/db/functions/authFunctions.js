const express = require('express')
const router = express.Router()
const path = require('path');
// const multer = require('multer'); // Node.js middleware for handling `multipart/form-data
const bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
const db = require('../../db/db.js')
const config = require('../../env/config.js')
const axios = require('axios')
const userFunctions = require('../functions/userFunctions.js')


//actual sign up function
router.signUp = function(userData) {
    var hash = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(7331));
    userData.password = hash
    return userFunctions.findOrCreateUser(userData)
}

router.verifyPassword = function(email, plainPass) {
    return userFunctions.findByEmail(email).then((user) => {
        if (email !== null && user !== null && user !== []) {
            return bcrypt.compareSync(plainPass, user.password) //resolves as bool
        } else {
            return false
        }
    })
}

//generates random string to set session hash
router.randomString = function() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  var string_length = 25;
  var randomstring = '';
  for (var i=0; i<string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring
}


//actual login function
router.login = function(user) {
    return router.verifyPassword(user.email, user.password).then(function(verified) {
        if (verified) {
            //cool you got verified, now lets give you a session
            var hash = router.randomString()
            return userFunctions.updateSession(user, hash).then(function(userDB) {
                return [userDB, hash]
            })
        } else {
            return null
        }
    })
}






module.exports = router