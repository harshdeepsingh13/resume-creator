import config from "../config/config";

export default (req, res, next) => {
	const {mode} = req.user;
	console.log("req.user", req.user);
	if (mode === config.tokenModes.portfolio) {
		req.error = {
			status: 401,
			message: "Invalid token."
		}
		return next(new Error());
	} else
		return next();
};
