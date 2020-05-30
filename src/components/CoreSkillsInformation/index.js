import React, {useEffect, useState} from 'react';
import './styles.scss';
import {InputFields, InputSubmit, InputTags} from "../InputFields";
import {STATUS} from '../../config/config';
import {getSkillInformation, updateSkillInformation} from "../../services/axios.service";
import Loader from "../Loader";
import SuccessAlert from "../SuccessAlert";

const CoreSkillsInformation = props => {
	const [skillsInformation, setSkillsInformation] = useState(
		{
			status: STATUS.DEFAULT,
			skills: []
		}
	);
	const [updateSkillInformationStatus, setUpdateSkillInformationStatus] = useState(STATUS.DEFAULT);

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      }) => {
		setSkillsInformation(
			{
				...skillsInformation,
				[name]: value
			}
		)
	};
	const handleSubmit = async () => {
		try {
			setUpdateSkillInformationStatus(STATUS.STARTED);
			await updateSkillInformation(skillsInformation.skills);
			setUpdateSkillInformationStatus(STATUS.SUCCESS);
		} catch (e) {
			console.log('update skills error')
		}
	};

	useEffect(
		() => {
			(async () => {
				setSkillsInformation(
					{
						...skillsInformation,
						status: STATUS.STARTED
					}
				);
				const {data: {data: {skills}}} = await getSkillInformation();
				setSkillsInformation(
					{
						...skillsInformation,
						status: STATUS.SUCCESS,
						skills
					}
				);
			})();
		},
		[]
	)

	return (
		<div className="coreSkillsInformation-container">
			{/*<h2>Skills Information</h2>*/}
			{
				updateSkillInformationStatus === STATUS.SUCCESS &&
				<SuccessAlert
					title={"Your updates are successfully saved!"}
					onSuccess={() => setUpdateSkillInformationStatus(STATUS.DEFAULT)}
				/>
			}
			{
				skillsInformation.status === STATUS.STARTED &&
				<Loader/>
			}
			{
				skillsInformation.status === STATUS.SUCCESS &&
				<InputFields>
					<InputTags
						id={'skills'}
						name={'skills'}
						iconName={'vial'}
						placeholder={'Add your skills'}
						handleChange={handleChange}
						value={skillsInformation.skills}
					/>
					<InputSubmit
						text={"Save"}
						handleClick={handleSubmit}
						isDisabled={updateSkillInformationStatus === STATUS.STARTED}
						loader={updateSkillInformationStatus === STATUS.STARTED}
					/>
				</InputFields>
			}
		</div>
	)
};

CoreSkillsInformation.propTypes = {};

export default CoreSkillsInformation