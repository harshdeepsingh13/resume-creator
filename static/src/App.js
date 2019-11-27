import React from 'react';
import './App.scss';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./components/Header";
import AppRouter from "./App.router";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Route
					component={Header}
				/>
				<AppRouter/>
			</BrowserRouter>
		</>
	)
};

export default App;
