const express = require('express')
const router = express.Router()
const path = require('path');
// const multer = require('multer'); // Node.js middleware for handling `multipart/form-data
const bcrypt = require('bcrypt-nodejs');
const cookieParser = require('cookie-parser');
const db = require('./../db/db.js')
const config = require('./../env/config.js')
const axios = require('axios')
const userFunctions = require('./../db/functions/userFunctions.js')
const authFunctions = require('./../db/functions/authFunctions.js')


router.post('/login', function(req, res) {
    authFunctions.login(req.body).then(function(user) {
        if (user) {
            //got a cookie?
            //yum, better save it
            res.cookie('session', user[1], {
                maxAge: 9000000,
                httpOnly: true
            }).cookie('user', cook[0].email, {
                maxAge: 9000000,
                httpOnly: true
            });
            res.status(200).send(user)
        } else if (!user) {
            throw new Error('Your username and password don\'t match. Please try again.')
        }
    }).catch(function(err) {
        res.status(500).send(err.message)
    })
})

router.get('/logout', function(req, res) {
    res.clearCookie("user");
    res.clearCookie("session");
    res.redirect('/login');
})

module.exports = router
