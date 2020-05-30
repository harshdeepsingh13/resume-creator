import {getToken, removeItem} from "../services/cookies.service";
import Home from "../containerComponents/Home";
import Templates from "../containerComponents/Templates";
import Register from "../containerComponents/Register";
import AllDetails from "../containerComponents/AllDetails";
import React from "react";

export default [
	{
		path: "/",
		condition: () => getToken(),
		privateComponent: Home,
		fallbackRoute: '/register',
		exact: true
	},
	{
		path: "/resume",
		condition: () => getToken(),
		privateComponent: Templates,
		fallbackRoute: '/register',
		exact: true
	},
	{
		path: "/register",
		condition: () => !getToken(),
		privateComponent: Register,
		fallbackRoute: '/',
		exact: true
	},
	{
		path: "/allDetails",
		condition: () => getToken(),
		privateComponent: AllDetails,
		fallbackRoute: '/',
		exact: true
	},
	{
		path: "/logout",
		condition: () => getToken(),
		privateComponent: (props) => {
			removeItem();
			window.location.href = '/';
			return <></>
		},
		fallbackRoute: '/',
		exact: true
	},
]
