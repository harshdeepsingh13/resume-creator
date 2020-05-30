import routes from '../../src/config/routes';
import {matchPath} from "react-router-dom";

export default (req, res, next) => {
	console.log('req', req.path, JSON.stringify(routes))
	let match = routes.find(({path, fallbackRoute}) => {
		console.log('path', path, matchPath(req.path, {
			path,
			exact: true,
		}) /*|| matchPath(req.path, {path: fallbackRoute, exact: true})*/);

		return matchPath(req.path, {
			path,
			exact: true,
		}) /*|| matchPath(req.path, {path: fallbackRoute, exact: true})*/;
	});
	console.log('match', match);
	// bail

	next();
	return;
};
