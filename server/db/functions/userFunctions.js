const userModel = require('../models/user.js');
const xPorts = {};

xPorts.saveUserFn = function(user) {
    return new userModel(user).save()
}

module.exports = xPorts;
