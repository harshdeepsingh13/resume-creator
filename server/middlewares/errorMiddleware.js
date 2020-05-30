import config from '../config/config';

const {logger} = config;

export default (err, req, res, next) => {
	logger.error(`[ errorMiddleware.js ] Error occured --- ${err}`)
	if (req.error) {
		const {
			status,
			message
		} = req.error;
		res.status(status).json({
			status,
			message
		})
	} else {
		res.status(500).json(
			{
				status: 500,
				message: "Internal Server Error"
			}
		)
	}
}
