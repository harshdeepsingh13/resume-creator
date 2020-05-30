import config from "./config";

import mongoose from "mongoose";

const {logger, mongodbConnectionURL} = config;
export default () => {
	mongoose.connect(mongodbConnectionURL, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
		.then(r => logger.info("Connection with DB is successful."))
		.catch(err => logger.error(`Error in connecting with DB - ${err}`));
};
