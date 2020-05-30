import path from 'path';
import fs from 'fs';
import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Morgan from "morgan";

import config from './config/config'
import App from '../src/App';
import AppRouter from '../src/App.router';
import v1Routes from './api/v1';
import errorMiddleware from './middlewares/errorMiddleware';
import mongooseConnection from './config/mongoose';

const port = process.env.PORT || 8081;
const app = express();
const {logger} = config;

//middlewares
app.use(Morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//mongodb connection
mongooseConnection();

//API routes
const apiRoutes = express.Router();
app.use('/api', apiRoutes);
v1Routes(apiRoutes);

//error handler
app.use(errorMiddleware);

//React SSR
app.use(express.static('./build')); //specify react static build directory
app.get('*', (req, res, next) => {
	const context = {};
	const app = ReactDOMServer.renderToString(<StaticRouter location={req.url} context={context}>
		{/*<App/>*/}
		<AppRouter/>
	</StaticRouter>);
	const indexFile = path.resolve('./build/index.html')
	fs.readFile(indexFile, 'utf8', (err, data) => {
		if (err) {
			console.log('error', err);
		}
		res.send(
			data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
		);
	})
});

app.listen(port, () => logger.info(`Server is running on port - ${port}`));
