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


// router.verifyPassword = function(user, plainPass) {
//     return db.userFunctions.findByUserName(user).then(function(userDB) {
//         if (user !== null && userDB !== null && userDB !== []) {
//             return bcrypt.compareSync(plainPass, userDB.password) //resolves as bool
//         } else {
//             return false
//         }
//     })
// }


module.exports = router