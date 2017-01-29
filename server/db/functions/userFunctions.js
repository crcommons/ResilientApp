const userModel = require('../models/user.js');
const xPorts = {};

xPorts.saveUserFn = function(user) {
    return new userModel(user).save()
}

xPorts.findByEmail = function(email) {
    return userModel.findOne({email: email})
}

xPorts.findOrCreateUser = function(userData) {
    return xPorts.findByEmail(userData.email).then(function(data) {
        if (!data) { //no data, user isnt in the db
            userData.verified = false;
            userData.session = 'null';
            xPorts.saveUserFn(userData)
            return false
        } else if (data) { //got data
            return true
        }
    })
}

xPorts.updateSession = function(user, hash) {
    return xPorts.findByEmail(user.email).then(function(user) {
            user.session = hash
            user.update()
            user.save()
            return user
        })
        .catch((err) => {
            console.error('ERROR IN USER FUNCTIONS UPDATE SESSION:', err);
        })
}

module.exports = xPorts;
