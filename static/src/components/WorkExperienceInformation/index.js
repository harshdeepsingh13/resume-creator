import React, {useEffect, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {InputDate, InputFields, InputSubmit, InputText, InputTextArea, InputToggle} from "../InputFields";
import {STATUS, STYLE_CONSTANTS} from '../../config/config';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {deleteWorkExperience, getWorkExperiences, updateWorkExperiences} from "../../services/axios.service";
import Loader from "../Loader";
import SuccessAlert from "../SuccessAlert";

library.add(faTimes);

const WorkExperienceInformation = props => {
	const [workExperience, setWorkExperience] = useState(
		{
			workExperience: [],
			status: STATUS.DEFAULT
		}
	);
	const [updateWorkExperienceStatus, setUpdateWorkExperienceStatus] = useState(STATUS.DEFAULT);

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      },
	                      index) => {
		setWorkExperience(
			{
				...workExperience,
				workExperience: [
					...workExperience.workExperience.slice(0, index),
					{
						...workExperience.workExperience[index],
						[name]: value
					},
					...workExperience.workExperience.slice(index + 1)
				]
			}
		);
	};
	const removeWorkExperience = index => {
		workExperience.workExperience[index]._id && deleteWorkExperience(workExperience.workExperience[index]._id);
		if (workExperience.workExperience.length !== 1)
			setWorkExperience(
				{
					...workExperience,
					workExperience: [
						...workExperience.workExperience.slice(0, index),
						...workExperience.workExperience.slice(index + 1)
					]
				}
			);
		else
			setWorkExperience(
				{
					...workExperience,
					workExperience: [
						{
							company: undefined,
							position: undefined,
							startDate: undefined,
							endDate: undefined,
							isPresent: 'false',
							responsibilities: undefined,
							location: undefined
						}
					]
				}
			)
	};
	const addWorkExperience = () => {
		setWorkExperience(
			{
				...workExperience,
				workExperience: [
					...workExperience.workExperience,
					{
						company: undefined,
						position: undefined,
						startDate: undefined,
						endDate: undefined,
						isPresent: 'false',
						responsibilities: undefined,
						location: undefined
					}
				]
			}
		)
	};
	const handleSubmit = async () => {
		try {
			setUpdateWorkExperienceStatus(STATUS.STARTED);
			setWorkExperience(
				{
					...workExperience,
					status: STATUS.STARTED
				}
			);
			const {data: {data: workExperiences}} = await updateWorkExperiences(
				workExperience.workExperience.map(workExperience => (
					{
						...workExperience,
						isPresent: workExperience.isPresent === "true"
					}
				))
			);
			setWorkExperience(
				{
					...workExperience,
					status: STATUS.SUCCESS,
					workExperience: [
						...workExperiences.map(workExperience => (
							{
								...workExperience,
								isPresent: workExperience.isPresent.toString(),
								startDate: new Date(workExperience.startDate).toISOString().slice(0, 10),
								endDate: workExperience.endDate ? new Date(workExperience.endDate).toISOString().slice(0, 10) : undefined
							}
						))
					]
				}
			);
			setUpdateWorkExperienceStatus(STATUS.SUCCESS);
		} catch (e) {
			console.log('Error in updating workExperiences')
		}
	};

	useEffect(
		() => {
			(async () => {
				try {
					setWorkExperience(
						{
							...workExperience,
							status: STATUS.STARTED
						}
					);
					const {data: {data: {workExperiences}}} = await getWorkExperiences();
					setWorkExperience(
						{
							...workExperience,
							status: STATUS.SUCCESS,
							workExperience: workExperiences.length ?
								[
									...workExperiences.map(workExperience => (
										{
											...workExperience,
											isPresent: workExperience.isPresent.toString(),
											startDate: new Date(workExperience.startDate).toISOString().slice(0, 10),
											endDate: workExperience.endDate ? new Date(workExperience.endDate).toISOString().slice(0, 10) : undefined
										}
									))
								] :
								[
									{
										company: undefined,
										position: undefined,
										startDate: undefined,
										endDate: undefined,
										isPresent: 'false',
										responsibilities: undefined,
										location: undefined
									}
								]
						}
					)
				} catch (e) {
					console.log('error in retrieving existing workexperiences');
				}
			})();
		},
		[]
	);
	return (
		<div className="workExperienceInformation-container">
			{
				workExperience.status === STATUS.STARTED &&
				<Loader/>
			}
			{
				updateWorkExperienceStatus === STATUS.SUCCESS &&
				<SuccessAlert
					title={"Your updates are successfully saved!"}
					onSuccess={() => setUpdateWorkExperienceStatus(STATUS.DEFAULT)}
				/>
			}
			{
				workExperience.status === STATUS.SUCCESS &&
				<InputFields>
					{
						workExperience.workExperience.map((information, index) => (
							<WorkExperienceInstance
								key={index}
								index={index}
								handleChange={handleChange}
								handleClose={removeWorkExperience}
								workExperience={information}
							/>
						))
					}
					<InputSubmit
						theme={'secondary-button'}
						text={'+ Add'}
						styles={
							{
								width: "20%"
							}
						}
						handleClick={addWorkExperience}
					/>
					<InputSubmit
						text={"Save"}
						handleClick={handleSubmit}
						loader={updateWorkExperienceStatus === STATUS.STARTED}
						isDisabled={updateWorkExperienceStatus === STATUS.STARTED}
					/>
				</InputFields>
			}
		</div>
	)
};

WorkExperienceInformation.propTypes = {};

const WorkExperienceInstance = ({workExperience, index, handleClose, handleChange}) => {
	return (
		<div className="workExperience multiple-instances">
			<div className="workExperienceFields-container multiple-instances-fields">
				<InputText
					id={'company'}
					name={'company'}
					placeholder={"Company Name"}
					value={workExperience.company}
					handleChange={(event) => handleChange(event, index)}
					iconName={['far', 'building']}
				/>
				<InputText
					id={"position"}
					name={"position"}
					placeholder={"Your position in the organization"}
					value={workExperience.position}
					handleChange={(event) => handleChange(event, index)}
					iconName={'crosshairs'}
				/>
				<InputDate
					id={"startDate"}
					name={"startDate"}
					placeholder={"Start date of employment"}
					value={workExperience.startDate}
					handleChange={(event) => handleChange(event, index)}
					completeDate={true}
				/>
				<InputDate
					id={"endDate"}
					name={"endDate"}
					placeholder={"End date of employment"}
					value={workExperience.endDate}
					handleChange={(event) => handleChange(event, index)}
					disabled={workExperience.isPresent === "true"}
					completeDate={true}
				/>
				<InputToggle
					id={"isPresent"}
					name={"isPresent"}
					placeholder={"still working here?"}
					value={workExperience.isPresent === "true"}
					handleChange={(event) => handleChange(event, index)}
				/>
				<InputTextArea
					id={"responsibilities"}
					name={"responsibilities"}
					placeholder={"Describe your role/responsibilities in the organization"}
					value={workExperience.responsibilities}
					characterLimit={500}
					handleChange={(event) => handleChange(event, index)}
					iconName={['fab', 'superpowers']}
				/>
				<InputText
					id={'location'}
					name={'location'}
					placeholder={'Working location (City, State, Country)'}
					value={workExperience.location}
					handleChange={(event) => handleChange(event, index)}
					iconName={"map-marker-alt"}
				/>
			</div>
			<div className="close-container multiple-instances-close-container">
				<FontAwesomeIcon
					icon={"times"}
					color={STYLE_CONSTANTS.BASIC_COLORS.BLUEY_GREY}
					size={'lg'}
					className="cancel"
					onClick={handleClose.bind(this, index)}
				/>
			</div>
		</div>
	)
};

WorkExperienceInstance.propTypes = {
	workExperience: PropTypes.object.isRequired,
	handleClose: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	index: PropTypes.number.isRequired
};

export default WorkExperienceInformation