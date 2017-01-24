const mongoose = require('mongoose');
const config = require('../env/config.js')

mongoose.Promise = global.Promise;
const mongodbUri = 'mongodb://'+ config.mLabObj.username + ':' + config.mLabObj.password + '@ds127429.mlab.com:27429/resilient_dev';
mongoose.connect(mongodbUri);
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

//define models BEFORE functions
// const recipeModel = require('./models/recipe.js')
// const userModel = require('./models/user.js')
// const photoModel = require('./models/photo.js')

//functions should be able to access the models because they are defined BEFORE
// const commentFunctions = require('./functions/commentFunctions.js')
// const photoFunctions = require('./functions/photoFunctions.js')
// const recipeFunctions = require('./functions/recipeFunctions.js')
// const userFunctions = require('./functions/userFunctions.js')
// const scraperFunctions = require('./functions/scraperFunctions.js')



//DEFINE EXPORTS LASTSSSSS
const xPorts = {
  mongoose: mongoose,
  connection: connection,
  mongodbUri: mongodbUri,
  // photoModel: photoModel,
  // recipeModel: recipeModel,
  // userModel: userModel,
  // commentFunctions: commentFunctions,
  // photoFunctions: photoFunctions,
  // recipeFunctions: recipeFunctions,
  // userFunctions: userFunctions,
  // scraperFunctions: scraperFunctions
}

module.exports = xPorts;