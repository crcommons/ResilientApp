const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
	first_name: String,
	last_name: String,
	email: String,
	password: String,
	reports:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	posts:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	messages:[{
		type: Schema.Types.ObjectId,
		ref: 'recipes'
	}],
	verified: Boolean,
	session: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	location: {
		state: String,
		country: String,
		zip: String
	}
})

const User = mongoose.model('user', UserSchema);

module.exports = User;