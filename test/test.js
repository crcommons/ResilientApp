const assert = require('assert');
const db = require('../server/db/db.js');

const User = require('../server/db/models/user.js');
const userFunctions = require('../server/db/functions/userFunctions.js')
const auth = require('../server/db/functions/authFunctions.js')

// const axios = require('axios')

//TO MAKE SURE THAT THE TEST SUITE IS WORKING
var test = true;
describe('passing a test', () => {
    xit('should return true', (done) => {
        assert(test);
        done();
    })
})

//TEST TO SAVE A NEW USER
var carolyn = {
	first_name: 'Carolyn',
	last_name: 'Commons',
	password: 'abc123',
	email: 'crcommons@gmail.com'
}

//BASIC SAVING A NEW USER
describe('saving a new user', () => {
	xit('should save a new user to the DB using saveUserFn', (done) => {
		var newUser = userFunctions.saveUserFn(carolyn)
		.then(() => {
			assert(!newUser.isNew);
			done()
		})
	})
})

//TEST TO ENCRYPT AND HASH A PASSWORD
describe('saving a new user', () => {
	xit('should sign up new user to the DB using saveUserFn', (done) => {
		var newUser = auth.signUp(carolyn)
		.then(() => {
			assert(!newUser.isNew);
			done()
		})
	})
}) 

//TESTING NEW FUNCTION TO SAVE A USER (FIND OR CREATE)
describe('saving a new user', () => {
	xit('should save a new user to the DB using findOrCreateUser', (done) => {
		var newUser = auth.signUp(carolyn)
		.then(() => {
			assert(!newUser.isNew);
			done()
		})
	})
}) 

//TEST TO CONFIRM THAT IT DOES NOT CREATE A NEW USER WHEN EMAIL IS ALREADY IN DB
//MAKE SURE USER EMAIL IS IN DB ALREADY
describe('testing if user is already in db', () => {
	xit('should return true because user already exists', (done) => {
		auth.signUp(carolyn)
		.then((newUser) => {
			assert(newUser);
			done()
		})
	})
}) 


//TESTING THE ABILITY TO UPDATE SESSION KEYS FOR A USER
describe('storing session in db', () => {
	it('should set the session in the users document', (done) => {
		userFunctions.updateSession(carolyn, 'a12kgdo8u43')
		.then((user) => {
			assert(user.session === 'a12kgdo8u43');
			done()
		})
	})
}) 