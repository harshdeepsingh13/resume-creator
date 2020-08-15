import winston, {format} from 'winston';

const {combine, timestamp, printf, colorize} = format;
const myFormat = printf(({level, message, label, timestamp}) => {
	return `${level} [${timestamp}] ${message}`;
});
let mongodbConnectionURL = 'mongodb://database:27017/resume-creator';

if (process.env.MODE === 'herokudev' || process.env.MODE === 'prod') {
	mongodbConnectionURL = process.env.MONGODB_URI;
}
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
	mongodbConnectionURL,
	cloudinary: {
		defaultResponseURL: "https://res.cloudinary.com/harshdeep-singh/resumeCreator/"
	}
}
