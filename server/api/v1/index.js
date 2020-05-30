import express from 'express';

import user from './User';

export default v1Routes => {
	const app = express.Router();
	v1Routes.use('/v1', app);
	app.use('/user', user);
};
