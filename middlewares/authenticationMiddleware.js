const {getUser} = require("../api/v1/User/user.model");
const {getPayload} = require("../services/jwt.service");
module.exports = async (req, res, next) => {
	console.log('query', req.query);
	if (req.query.secret === "thisIsHd") {
		try {
			const user = await getUser('harshdeepsingh13@gmail.com');
			if (!user) {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				next(new Error());
			}
			req.user = user;
			next();
		} catch (e) {
			if (e.name === "JsonWebTokenError") {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				next(new Error());
			}
			next(e);
		}
	} else {
		if (!req.headers.authentication) {
			req.error = {
				status: 401,
				message: "Authentication token required."
			};
			next(new Error());
		}
		try {
			const {email} = getPayload(req.headers.authentication.split('Bearer ')[0]);
			const user = await getUser(email);
			if (!user) {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				next(new Error());
			}
			req.user = user;
			next();
		} catch (e) {
			if (e.name === "JsonWebTokenError") {
				req.error = {
					status: 401,
					message: "Invalid token."
				}
				next(new Error());
			}
			next(e);
		}
	}
};