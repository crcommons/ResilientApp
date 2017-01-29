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
	password: 'abc123'
}
describe('saving a new user', () => {
	xit('should save a new user to the DB', (done) => {
		var newUser = userFunctions.saveUserFn(carolyn)
		.then(() => {
			assert(!newUser.isNew);
			done()
		})
	})
})

//TEST TO ENCRYPT AND HASH A PASSWORD
describe('saving a new user', () => {
	it('should save a new user to the DB', (done) => {
		var newUser = auth.signUp(carolyn)
		.then(() => {
			assert(!newUser.isNew);
			done()
		})
	})
}) 