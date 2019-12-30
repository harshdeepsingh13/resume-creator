import React from 'react';
import PropTypes from 'prop-types';
import {Redirect, Route} from "react-router-dom";
import {getToken, removeItem} from './services/localStorage.service';
import Register from "./containerComponents/Register";
import AllDetails from "./containerComponents/AllDetails";
import Home from "./containerComponents/Home";
import Templates from "./containerComponents/Templates";

const AppRouter = props => {
	return (
		<>
			<CustomRoute
				path={'/'}
				condition={() => getToken()}
				privateComponent={Home}
				fallbackRoute={'/register'}
				exact
			/>
			<CustomRoute
				path={'/resume'}
				condition={() => getToken()}
				privateComponent={Templates}
				fallbackRoute={'/register'}
				exact
			/>
			<CustomRoute
				path={'/register'}
				condition={() => !getToken()}
				privateComponent={Register}
				fallbackRoute={"/"}
				exact
			/>
			<CustomRoute
				path={'/allDetails'}
				condition={() => getToken()}
				privateComponent={AllDetails}
				fallbackRoute={"/"}
			/>
			<CustomRoute
				path={'/logout'}
				condition={() => getToken()}
				privateComponent={(props) => {
					removeItem();
					window.location.href = '/';
					return <></>
				}}
				fallbackRoute={'/'}
			/>
		</>
	)
};

const CustomRoute = ({
	                     privateComponent: PrivateComponent,
	                     fallbackComponent: FallbackComponent,
	                     fallbackRoute,
	                     condition,
	                     ...restProps
                     }) => (
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