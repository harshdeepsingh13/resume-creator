const winston = require('winston');
const {format: {combine, timestamp, printf, colorize}} = require('winston');

const myFormat = printf(({level, message, label, timestamp}) => {
	return `${level} [${timestamp}] ${message}`;
});
module.exports = {
	logger: winston.createLogger({
		format: combine(
			// label({ label: 'right meow!' }),
			colorize(),
			timestamp(),
			myFormat,
			// prettyPrint(),

		),
		transports: [
			new winston.transports.Console(),
			new winston.transports.File({filename: 'dev_api.log'})
		]
	}),
	mongodbConnectionURL: process.env.MODE === 'dev' ? 'mongodb://localhost:27017/resume-creator' : '',
	cloudinary: {
		defaultResponseURL: "https://res.cloudinary.com/harshdeep-singh/resumeCreator/"
	}
}