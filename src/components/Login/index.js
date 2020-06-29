import React, {useRef, useState} from 'react';
import './styles.scss';
import {InputEmail, InputFields, InputPassword, InputSubmit} from "../InputFields";
import verifyFormFields from '../../services/verifyFormFields.service';
import {login} from "../../services/axios.service";
import {STATUS, STYLE_CONSTANTS} from '../../config/config';
import Error from "../Error";
import ErrorAlert from "../ErrorAlert";
import {setItem} from "../../services/cookies.service";

const Login = props => {

	const [email, setEmail] = useState({
		value: '',
		isError: false,
		isEmpty: false
	});
	const [password, setPassword] = useState({
		value: '',
		isError: false,
		isEmpty: false
	});
	const [loginStatus, setLoginStatus] = useState({
		status: STATUS.DEFAULT,
		message: {
			status: -1,
			message: ''
		}
	});

	const submitButtonRef=useRef(undefined);

	/*useEffect( () => {
		if(loginStatus.status === STATUS.SUCCESS) {
			setItem()
		}
	},[loginStatus])*/

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      }) => {
		name === 'email' && setEmail({...email, value});
		name === 'password' && setPassword({...password, value});
	};
	const handleError = (field, isError) => {
		field === 'email' && setEmail({...email, isError});
		field === 'password' && setPassword({...password, isError});
	};
	const handleSubmit = () => {
		console.log('handleSubmit');
		const verifyFields = verifyFormFields({
			email,
			password
		});
		if (verifyFields.length === 0) {
			setLoginStatus({...loginStatus, status: STATUS.STARTED});
			login(email.value, password.value)
				.then(({data}) => {
					setItem(data.data);
					window.location.href = '/';
					setLoginStatus({
						status: STATUS.SUCCESS
					})
				})
				.catch(({response}) => {
					setLoginStatus({
						status: STATUS.FAILURE,
						message: {
							status: response.data.status || 500,
							message: response.data.message
						}
					});
				})
		} else {
			for (let field of verifyFields) {
				field === 'email' && setEmail({...email, isEmpty: true});
				field === 'password' && setPassword({...password, isEmpty: true});
			}
		}
	}
	const handleKeyPress = ({keyCode}) => {
		if(keyCode === 13){
			submitButtonRef.current.click()
		}
	}

	return (
		<div className="login-container">
			{
				(loginStatus.status === STATUS.FAILURE &&
					loginStatus.message.status !== 500) &&
				<Error
					message={
						(loginStatus.message.status === 400 &&
							`Email and password are required`) ||
						(loginStatus.message.status === 404 &&
							`Email / Password is incorrect`)
					}
					styles={
						{
							backgroundColor: `rgba(255, 0, 0, 0.5)`,
							color: 'white',
							padding: '10px 0',
							borderRadius: `${STYLE_CONSTANTS.BORDER_RADIUS}`,
							border: 'thin solid red',
							fontSize: '17px',
							textAlign: 'center'
						}
					}
				/>
			}
			{
				(loginStatus.status === STATUS.FAILURE &&
					loginStatus.message.status === 500) &&
				<ErrorAlert
					title={"Internal Server Error"}
					descriptionHtml={"<p>Try again or contact the admin <a href='mailto:hdsingh2015@outlook.com'> hdsingh2015@outlook.com </a> </p>"}
					onSuccess={() => setLoginStatus({
						status: STATUS.DEFAULT
					})}
				/>
			}
			<InputFields>
				<InputEmail
					id={"email"}
					name={"email"}
					placeholder={"Email"}
					isEmpty={email.isEmpty}
					value={email.value}
					required={true}
					handleChange={handleChange}
					handleError={handleError}
					handleKeyPress={handleKeyPress}
				/>
				<InputPassword
					id={"password"}
					name={"password"}
					placeholder={"Password"}
					isEmpty={password.isEmpty}
					required={true}
					value={password.value}
					handleChange={handleChange}
					handleError={handleError}
					handleKeyPress={handleKeyPress}
				/>
				<InputSubmit
					text={"Login"}
					ref={submitButtonRef}
					handleClick={handleSubmit}
					isDisabled={email.isError || password.isError}
					loader={loginStatus.status === STATUS.STARTED}
				/>
			</InputFields>
		</div>
	)

};

Login.propTypes = {};

export default Login
