import React, {useEffect, useState} from 'react';
import './styles.scss';
import {
	InputDate,
	InputEmail,
	InputFields,
	InputNumber,
	InputSelect,
	InputSubmit,
	InputTags,
	InputText,
	InputTextArea
} from "../InputFields";
import {checkWebsiteLink} from '../../services/utils';
import {ERROR_MESSAGES, STATUS} from '../../config/config';
import {getBasicInformation, updateBasicInformation} from "../../services/axios.service";
import Loader from "../Loader";
import SuccessAlert from "../SuccessAlert";

const BasicInformation = props => {
	const [basicInformation, setBasicInformation] = useState(
		{
			status: STATUS.DEFAULT,
			socialMediaLinks: {
				linkedin: {}
			}
		}
	);
	const [updateBasicInformationStatus, setUpdateBasicInformationStatus] = useState(STATUS.DEFAULT);

	useEffect(
		() => {
			//setdetails from db

			(async () => {
				setBasicInformation(
					{
						...basicInformation,
						status: STATUS.STARTED
					}
				);
				const {
					data: {
						data: {
							basicInformation: basicInformationFromDB
						}
					}
				} = await getBasicInformation();
				if (basicInformationFromDB.socialMediaLinks) {
					delete (basicInformationFromDB.socialMediaLinks._id);
					delete (basicInformationFromDB.socialMediaLinks.createdAt);
					delete (basicInformationFromDB.socialMediaLinks.updatedAt);
					for (let [socialMediaKey, socialMediaValue] of Object.entries(basicInformationFromDB.socialMediaLinks)) {
						basicInformationFromDB.socialMediaLinks[socialMediaKey] = {
							value: socialMediaValue
						}
					}
				}
				setBasicInformation({
					...basicInformation,
					status: STATUS.SUCCESS,
					name: basicInformationFromDB.name,
					tags: basicInformationFromDB.tags,
					objective: basicInformationFromDB.objective,
					email: basicInformationFromDB.email,
					contactNumber: basicInformationFromDB.contactNumber,
					state: (basicInformationFromDB.currentLocation && basicInformationFromDB.currentLocation.state) ? basicInformationFromDB.currentLocation.state : '',
					country: (basicInformationFromDB.currentLocation && basicInformationFromDB.currentLocation.country) ? basicInformationFromDB.currentLocation.country : '',
					dob: basicInformationFromDB.dob ? new Date(basicInformationFromDB.dob).toISOString().slice(0, 10) : '',
					website: basicInformationFromDB.website,
					avatar: {
						uploadId: basicInformationFromDB.avatar.uploadId
					},
					socialMediaLinks: basicInformationFromDB.socialMediaLinks ? basicInformationFromDB.socialMediaLinks : {}
				});
			})();
		},
		[]
	);

	/*useEffect(
		() => {
			console.log('basicInformation ', basicInformation);
		},
		[basicInformation]
	);*/

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      }) => {
		name !== "socialMediaPlatforms" ?
			name.split('.')[0] === "socialMediaLinks" ?
				setBasicInformation({
						...basicInformation,
						[name.split('.')[0]]: {
							...basicInformation[name.split('.')[0]],
							[name.split('.')[1]]: {
								value
							}
						}
					}
				) :
				setBasicInformation({
					...basicInformation,
					[name]: value
				})
			:
			setBasicInformation({
				...basicInformation,
				socialMediaLinks: {
					...basicInformation.socialMediaLinks,
					[value]: {}
				}
			})
	};
	const handleSubmit = async () => {
		const information = basicInformation;
		information.socialMediaLinks = Object.keys(information.socialMediaLinks).reduce((smLinks, sm) => {
			smLinks[sm] = information.socialMediaLinks[sm].value;
			return smLinks
		}, {});
		try {
			setUpdateBasicInformationStatus(STATUS.STARTED);
			await updateBasicInformation(information);
			setUpdateBasicInformationStatus(STATUS.SUCCESS);
		} catch (e) {

		}
	}

	return (
		<div className="basicInformation-container">
			{/*<h2>Basic Information</h2>*/}
			{
				updateBasicInformationStatus === STATUS.SUCCESS &&
				<SuccessAlert
					title={"Your updates are successfully saved!"}
					onSuccess={() => setUpdateBasicInformationStatus(STATUS.DEFAULT)}
				/>

			}
			{
				basicInformation.status === STATUS.STARTED &&
				<Loader/>
			}
			{
				basicInformation.status === STATUS.SUCCESS &&
				<InputFields>
					<InputText
						id={"name"}
						name={"name"}
						placeholder={"Name"}
						value={basicInformation.name}
						handleChange={handleChange}
						iconName={"signature"}
					/>
					<InputEmail
						id={"email"}
						name={"email"}
						placeholder={"Email"}
						value={basicInformation.email}
						handleChange={handleChange}
						disabled={true}
					/>
					<InputNumber
						id={"contactNumber"}
						name={"contactNumber"}
						value={basicInformation.contactNumber}
						handleChange={handleChange}
						placeholder={"Contact Number"}
						checkValue={
							value =>
								value.length !== 10 ?
									[true, ERROR_MESSAGES.CONTACT_NUMBER_NOT_VALID] :
									[false, '']
						}
						iconName={"phone-alt"}
					/>
					<InputDate
						id={"dob"}
						name={"dob"}
						value={basicInformation.dob}
						handleChange={handleChange}
						placeholder={"Date of birth"}
					/>
					<InputTextArea
						id={"objective"}
						name={"objective"}
						value={basicInformation.objective}
						placeholder={"Profile Objective"}
						handleChange={handleChange}
						iconName={"bullseye"}
						characterLimit={200}
					/>
					<div className="currentLocation-container">
						{/*<h3>Current Location</h3>*/}
						<div className="currentLocation">
							<InputText
								id={"state"}
								name={"state"}
								placeholder={"Current State"}
								value={basicInformation.state}
								handleChange={handleChange}
								iconName={"map-marker-alt"}
								styles={
									{
										textTransform: 'capitalize'
									}
								}
							/>
							<InputText
								id={"country"}
								name={"country"}
								placeholder={"Current Country"}
								value={basicInformation.country}
								handleChange={handleChange}
								iconName={"map-marker-alt"}
								styles={
									{
										textTransform: 'capitalize'
									}
								}
							/>
						</div>
					</div>
					<InputTags
						id={"tags"}
						name={"tags"}
						handleChange={handleChange}
						value={basicInformation.tags}
						placeholder={"Your tags"}
					/>
					<InputText
						id={"website"}
						name={"website"}
						value={basicInformation.website}
						handleChange={handleChange}
						placeholder={"Website"}
						iconName={"globe"}
						checkValue={checkWebsiteLink}
					/>
					<div className="socialMedia-container">
						<InputSelect
							id={"socialMediaPlatforms"}
							name={"socialMediaPlatforms"}
							placeholder={"Platforms"}
							value={"default"}
							options={
								[
									{value: 'default', text: 'Select the platform your want to add', isDefault: true},
									{value: 'linkedin', text: 'Linked In'},
									{value: 'github', text: 'GitHub'},
									{value: 'instagram', text: 'Instagram'},
									{value: 'facebook', text: 'Facebook'}
								]
							}
							handleChange={handleChange}
							iconName={"heart"}
						/>
						{
							Object.entries(basicInformation.socialMediaLinks)
								.map(([socialMediaKey, socialMediaValue]) =>
									<InputText
										id={`socialMediaLinks.${socialMediaKey}`}
										name={`socialMediaLinks.${socialMediaKey}`}
										value={socialMediaValue.value}
										handleChange={handleChange}
										checkValue={checkWebsiteLink}
										placeholder={`${socialMediaKey.charAt(0).toUpperCase()}${socialMediaKey.slice(1)}`}
										iconName={["fab", socialMediaKey]}
										canBeCanceled={true}
										onCancel={() => {
											delete basicInformation.socialMediaLinks[socialMediaKey];
											setBasicInformation({...basicInformation});
										}}
									/>
								)
						}
					</div>
					<InputSubmit
						handleClick={handleSubmit}
						text={"Save Changes"}
						loader={updateBasicInformationStatus === STATUS.STARTED}
						isDisabled={updateBasicInformationStatus === STATUS.STARTED}
					/>
				</InputFields>
			}
		</div>

	)
};

BasicInformation.propTypes = {};

export default BasicInformation