import React from 'react';
import './styles.scss';
import Logo from "../Logo";
import {InputFields, InputSubmit} from "../InputFields";

const Header = props => {
	return (
		<div className="header-container">
			<Logo/>

			<div className="navbar">
				<InputFields>
					<InputSubmit
						text={"Login/Register"}
						handleClick={() => props.history.push('/register')}
					/>
				</InputFields>
			</div>
		</div>
	)
};

Header.propTypes = {};

export default Header