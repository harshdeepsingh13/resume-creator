import React from 'react';
import './styles.scss';
import {Link} from "react-router-dom";

const Home = props => {
	return (
		<div className="home-container">
			<Link
				to={'/allDetails'}
			>
				Edit your Details
			</Link>
			<Link
				to={'/resume'}
			>
				Resume
			</Link>
		</div>
	)
};

Home.propTypes = {};

export default Home