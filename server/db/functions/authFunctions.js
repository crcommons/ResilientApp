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

const xPorts = {};

//actual sign up function
xPorts.signUp = function(userData) {
    var hash = bcrypt.hashSync(userData.password, bcrypt.genSaltSync(7331));
    userData.password = hash
    return userFunctions.findOrCreateUser(userData)
}

xPorts.verifyPassword = function(email, plainPass) {
    return userFunctions.findByEmail(email).then((user) => {
        if (email !== null && user !== null && user !== []) {
            return bcrypt.compareSync(plainPass, user.password) //resolves as bool
        } else {
            return false
        }
    })
}

//generates random string to set session hash
xPorts.randomString = function() {
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
xPorts.login = function(user) {
    return xPorts.verifyPassword(user.email, user.password).then(function(verified) {
        if (verified) {
            //cool you got verified, now lets give you a session
            var hash = xPorts.randomString()
            return userFunctions.updateSession(user, hash).then(function(userDB) {
                return [userDB, hash]
            })
        } else {
            return null
        }
    })
}

// xPorts.ensureAuthenticated = function(req, res, next) {
//     if (req.url === '/login' || req.url === '/signup') {
//         return next();
//     } else {
//         db.userFunctions.findByEmail(req.cookies.email).then(function(userDB) {
//             if (userDB == null) {
//                 res.redirect('/auth/logout')
//             } else if (userDB !== null) {
//                 if (req.cookies.session === userDB.session && req.cookies.session !== undefined && userDB.session !== undefined) {
//                     return next();
//                 } else {
//                     res.redirect('/auth/logout')
//                 }
//             } else {
//                 res.redirect('/auth/logout')
//             }
//         })
//     }
// }




module.exports = xPorts