import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Logo = props => {
	return (
		<div className="logo-container">
			<Link to={"/"} className="logo-link">
				<img
					src={`Resume-creator-02.png`}
					alt="Resume Creator Logo"
					className="logo"
				/>
			</Link>
		</div>
	)
};

Logo.propTypes = {};

export default Logo
