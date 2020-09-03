import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route, Switch} from "react-router-dom";
import routes from "./config/routes";
import Header from "./components/Header";

const AppRouter = props => {
	console.log("process.env", process.env);
	return (
		<>
			<Header/>
			<Switch>
				{
					routes.map((route, index) =>
						<CustomRoute
							key={index}
							{...route}
						/>)

				}
			</Switch>
		</>
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
