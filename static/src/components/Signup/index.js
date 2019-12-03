import React, {useState} from 'react';
import './styles.scss';
import {InputEmail, InputFields, InputPassword, InputSubmit, InputText} from "../InputFields";
import verifyFormFields from '../../services/verifyFormFields.service';
import {ERROR_MESSAGES, PASSWORD_REGEX} from '../../config/config';
import {register} from "../../services/axios.service";

const Signup = props => {
	const [firstName, setFirstName] = useState({
		value: '',
		isError: false,
		isEmpty: false
	});
	const [lastName, setLastName] = useState({
		value: '',
		isError: false,
		isEmpty: false
	});
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
	const [rePassword, setRePassword] = useState({
		value: '',
		isError: false,
		isEmpty: false
	});

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      }) => {
		name === "firstName" && setFirstName({...firstName, value});
		name === "lastName" && setLastName({...lastName, value});
		name === "email" && setEmail({...email, value});
		name === "password" && setPassword({...password, value});
		name === "rePassword" && setRePassword({...rePassword, value});
	};
	const handleError = (field, isError) => {
		field === "firstName" && setFirstName({...firstName, isError});
		field === "lastName" && setLastName({...lastName, isError});
		field === "email" && setEmail({...email, isError});
		field === "password" && setPassword({...password, isError});
		field === "rePassword" && setRePassword({...rePassword, isError});
	};
	const handleSubmit = () => {
		const formFields = verifyFormFields({
			firstName,
			email,
			password,
			rePassword
		});

		if (formFields.length === 0 && password) {
			register(`${firstName.value} ${lastName.value}`, email.value, password.value)
				.then(({data}) => {
					console.log('register response ', data);
				})
				.catch(({response}) => {
					console.log('error ', response);
				})
		} else {
			for (let field of formFields) {
				field === 'firstName' && setFirstName({...firstName, isEmpty: true});
				field === 'email' && setEmail({...email, isEmpty: true});
				field === 'password' && setPassword({...password, isEmpty: true});
				field === 'rePassword' && setRePassword({...rePassword, isEmpty: true});
			}
		}
	};

	return (
		<div className="signup-container">
			<InputFields>
				<div className="name-container">
					<InputText
						id={"firstName"}
						name={"firstName"}
						value={firstName.value}
						isEmpty={firstName.isEmpty}
						required={true}
						placeholder={"First Name"}
						handleChange={handleChange}
						handleError={handleError}
						styles={
							{
								textTransform: "capitalize"
							}
						}
					/>
					<InputText
						id={"lastName"}
						name={"lastName"}
						value={lastName.value}
						placeholder={"Last Name"}
						handleChange={handleChange}
						handleError={handleError}
						styles={
							{
								textTransform: "capitalize"
							}
						}
					/>
				</div>
				<InputEmail
					id={"email"}
					name={"email"}
					value={email.value}
					isEmpty={email.isEmpty}
					required={true}
					placeholder={"Email"}
					handleChange={handleChange}
					handleError={handleError}
				/>
				<InputPassword
					id={"password"}
					name={"password"}
					value={password.value}
					isEmpty={password.isEmpty}
					required={true}
					placeholder={"Password"}
					handleChange={handleChange}
					handleError={handleError}
					checkValue={value =>
						!value.match(PASSWORD_REGEX) ?
							[true, ERROR_MESSAGES.SHORT_PASSWORD] :
							[false, '']}
				/>
				<InputPassword
					id={"rePassword"}
					name={"rePassword"}
					value={rePassword.value}
					isEmpty={rePassword.isEmpty}
					required={true}
					placeholder={"Confirm Password"}
					handleChange={handleChange}
					handleError={handleError}
					checkValue={value =>
						value !== password.value ? [true, ERROR_MESSAGES.VERIFY_PASSWORD] :
							[false, '']}
				/>
				<InputSubmit
					text={"Register"}
					handleClick={handleSubmit}
				/>
			</InputFields>
		</div>
	)
};

Signup.propTypes = {};

export default Signup