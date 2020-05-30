import bcrypt from "bcryptjs";

import config from "../config/config";

const saltRounds = 10;
const {logger} = config;

export const encryptPassword = password => {
	console.log('encrypt');
	return bcrypt.hashSync(password, saltRounds)
};

export const comparePassword = (encryptedPassword, plainTextPassword) =>
	bcrypt.compareSync(plainTextPassword, encryptedPassword);
