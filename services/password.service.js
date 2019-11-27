const bcrypt = require('bcrypt');

const {logger} = require('../config/config');

const saltRounds = 10;

exports.encryptPassword = password => {
	console.log('encrypt');
	return bcrypt.hash(password, saltRounds)
};

exports.comparePassword = (encryptedPassword, plainTextPassword) =>
	bcrypt.compare(plainTextPassword, encryptedPassword);