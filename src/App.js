import React from 'react';
import './App.scss';
import {Route} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./App.router";

const App = () => {
	return (
		<>
				<Route
					component={Header}
				/>
				<AppRouter/>
		</>
	)
};

export default App;
