import winston, {format} from 'winston';

const {combine, timestamp, printf, colorize} = format;
const myFormat = printf(({level, message, label, timestamp}) => {
	return `${level} [${timestamp}] ${message}`;
});
export default {
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
