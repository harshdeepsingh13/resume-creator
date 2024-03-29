import React from 'react';
import './styles.scss';
import Login from "../../components/Login";
import UniversalTabsView from "../UniversalTabsView";
import Signup from "../../components/Signup";

const Register = props => {
	return (
		<div className="register-container">
			<UniversalTabsView
				styles={{width: "40%"}}
				initialTabIndex={1}
				tabs={
					[
						{
							tabHeader: 'Register',
							componentToRender: <Signup/>
						},
						{
							tabHeader: 'Login',
							componentToRender: <Login/>
						}
					]
				}
			/>
		</div>
	)
};

Register.propTypes = {};

export default Register
