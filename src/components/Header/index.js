import React from 'react';
import './styles.scss';
import Logo from "../Logo";
import {InputFields, InputSubmit} from "../InputFields";
import {withRouter} from "react-router";
import {getToken, removeItem} from "../../services/cookies.service";

const Header = props => {

	const onSubmitClick = () => {
		if (getToken()) {
			removeItem();
			window.location.href = "/";
		} else {
			props.history.push('/register');
		}
	}

	return (
		<div className="header-container">
			<Logo/>

			<div className="navbar">
				<InputFields>
					<InputSubmit
						text={getToken() ? "Logout" : "Login/Register"}
						handleClick={onSubmitClick}
						styles={{padding: "0 10px"}}
					/>
				</InputFields>
			</div>
		</div>
	)
};

Header.propTypes = {};

export default withRouter(Header)
