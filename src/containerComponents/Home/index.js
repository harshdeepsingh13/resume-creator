import React from 'react';
import './styles.scss';
import {Link} from "react-router-dom";

const Home = props => {
	return (
		<div className="home-container">
			<Link
				className="home-button"
				to={'/allDetails'}
			>
				Edit your Details
			</Link>
			<Link
				className="home-button"
				to={'/resume'}
			>
				Resume Templates
			</Link>
		</div>
	)
};

Home.propTypes = {};

export default Home
