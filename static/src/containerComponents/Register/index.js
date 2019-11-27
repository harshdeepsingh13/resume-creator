import React, {useState} from 'react';
import './styles.scss';
import {getQueryObject} from "../../services/utils";
import {STYLE_CONSTANTS} from "../../config/config";
import Login from "../../components/Login";
import Signup from "../../components/Signup";

const Register = props => {
	const {
		signupStatus,
		loginStatus,
		signup,
		login,
		reinitializeStatus,
		partnerId,
		partnerDetails,
		error
	} = props;
	const query = getQueryObject(props.location.search);
	const [currentTab, setCurrentTab] = useState((
		query.tab ?
			(query.tab === 'login' ? 0 : 1) :
			0
	));
	return (
		<div className="register-container">
			<div className="register-tabs-container">
				<div className="register-tabs-header-container">
					<div
						className="register-tabs-header Text-Style-2"
						style={
							{
								borderBottom: currentTab === 0 &&
									`2px solid ${STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_YELLOWISH}`
							}
						}
						onClick={() => setCurrentTab(0)}
					>
						Login
					</div>
					<div
						className="register-tabs-header Text-Style-2"
						style={
							{
								borderBottom: currentTab === 1 &&
									`2px solid ${STYLE_CONSTANTS.PRIMARY_COLORS.PRIMARY_YELLOWISH}`
							}
						}
						onClick={() => setCurrentTab(1)}
					>
						Register
					</div>
				</div>
				<div className="register-tabs">
					{
						currentTab === 0 &&
						<Login/>
					}
					{
						currentTab === 1 &&
						<Signup/>
					}
				</div>
			</div>
		</div>
	)
};

Register.propTypes = {};

export default Register