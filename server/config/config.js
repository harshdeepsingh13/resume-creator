import winston, {format} from 'winston';

const {combine, timestamp, printf, colorize} = format;
const myFormat = printf(({level, message, label, timestamp}) => {
	return `${level} [${timestamp}] ${message}`;
});

let mongodbConnectionURL = process.env.MONGODB_URI;
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
		defaultResponseURL: process.env.CLOUDINARY_DEFAULT_RESPONSE_URL
	},
	tokenModes: {
		normal: "normal",
		portfolio: "portfolio"
	}
}
