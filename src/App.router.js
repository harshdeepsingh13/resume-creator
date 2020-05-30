import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from "react-router-dom";
import {getToken, removeItem} from './services/localStorage.service';
import Register from "./containerComponents/Register";
import AllDetails from "./containerComponents/AllDetails";
import Home from "./containerComponents/Home";
import Templates from "./containerComponents/Templates";
import routes from "./config/routes";

const AppRouter = props => {
	return (
		<Switch>
			{
				routes.map(route =>
					<CustomRoute
						{...route}
					/>)

			}
		</Switch>
	)
};

const CustomRoute = ({
	                     privateComponent: PrivateComponent,
	                     fallbackComponent: FallbackComponent,
	                     fallbackRoute,
	                     condition,
	                     ...restProps
                     }) => {
	console.log('props', fallbackRoute);
	return (
		<Route
			{
				...restProps
			}
			render={
				(props) => {
					return condition() ?
						<PrivateComponent
							{
								...props
							}
						/> :
						FallbackComponent ?
							<FallbackComponent
								{
									...props
								}
							/> :
							<Redirect
								to={
									{
										pathname: fallbackRoute
									}
								}
							/>
				}
			}
		/>
	);
};
CustomRoute.propTypes = {
	exact: PropTypes.any,
	path: PropTypes.string.isRequired,
	privateComponent: PropTypes.func.isRequired,
	fallbackComponent: PropTypes.func,
	fallbackRoute: PropTypes.string,
	condition: PropTypes.func.isRequired
};

AppRouter.propTypes = {};

export default AppRouter
