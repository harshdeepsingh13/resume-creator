import React, {useEffect, useState} from 'react';
import './styles.scss';
import {ERROR_MESSAGES, STATUS, STYLE_CONSTANTS} from '../../config/config';
import PropTypes from 'prop-types';
import {InputDate, InputFields, InputNumber, InputSelect, InputSubmit, InputText, InputToggle} from "../InputFields";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {getEducationInformation, updateEducationInformation} from "../../services/axios.service";
import SuccessAlert from "../SuccessAlert";
import Loader from "../Loader";

library.add(faTimes);

const EducationInformation = props => {
	const [educationInformation, setEducationInformation] = useState({
		status: STATUS.DEFAULT,
		educations: []
	});
	const [updateEducationInformationStatus, setUpdateEducationInformationStatus] = useState(STATUS.DEFAULT);

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      },
	                      index) => {
		setEducationInformation({
			...educationInformation,
			educations: [
				...educationInformation.educations.slice(0, index),
				{
					...educationInformation.educations[index],
					[name]: value
				},
				...educationInformation.educations.slice(index + 1)
			]
		})
	};

	const addEducationInstance = () => {
		setEducationInformation({
			...educationInformation,
			educations: [
				...educationInformation.educations,
				{
					type: "default",
					instituteName: undefined,
					university: undefined,
					startDate: undefined,
					endDate: undefined,
					isPresent: "false",
					course: undefined,
					score: undefined,
					isPercentage: "true",
					isCGPA: "false"
				}
			]
		})
	};

	const removeEducationInstance = index => {
		if (educationInformation.educations.length !== 1) {
			setEducationInformation({
				...educationInformation,
				educations: [
					...educationInformation.educations.slice(0, index),
					...educationInformation.educations.slice(index + 1)
				]
			})
		}
	};

	const saveEducationInformation = async () => {
		setUpdateEducationInformationStatus(STATUS.STARTED);
		try {
			await updateEducationInformation(
				educationInformation.educations.map(educationDetails => (
					{
						...educationDetails,
						isPresent: educationDetails.isPresent === "true",
						isPercentage: educationDetails.isPercentage === 'true',
						isCGPA: educationDetails.isCGPA === 'true'
					}
				))
			);
			setUpdateEducationInformationStatus(STATUS.SUCCESS);
		} catch (e) {
		}
	};

	useEffect(
		() => {

			(async () => {
				setEducationInformation({
					...educationInformation,
					status: STATUS.STARTED
				});
				const {
					data: {
						data: {
							educationInformation: {
								educationInformation: {
									educations
								}
							}
						}
					}
				} = await getEducationInformation();
				setEducationInformation(
					{
						...educationInformation,
						status: STATUS.SUCCESS,
						educations: educations.length ?
							[
								...educations.map(education => ({
									...education,
									startDate: new Date(education.startDate).toISOString().slice(0, 7),
									endDate: education.endDate ? new Date(education.endDate).toISOString().slice(0, 7) : undefined,
									isPresent: education.isPresent.toString(),
									isPercentage: education.isPercentage.toString(),
									isCGPA: education.isCGPA.toString()
								}))
							] :
							[
								{
									type: "default",
									instituteName: undefined,
									university: undefined,
									startDate: undefined,
									endDate: undefined,
									isPresent: "false",
									course: undefined,
									score: undefined,
									isPercentage: "true",
									isCGPA: "false"
								}
							]
					}
				)
			})();
		},
		[]
	);
	return (
		<div className="educationInformation-container">
			{/*<h2>Education Details</h2>*/}
			{
				updateEducationInformationStatus === STATUS.SUCCESS &&
				<SuccessAlert
					title={"Your updates are successfully saved!"}
					onSuccess={() => setUpdateEducationInformationStatus(STATUS.DEFAULT)}
				/>

			}
			{
				educationInformation.status === STATUS.STARTED &&
				<Loader/>
			}
			{
				educationInformation.status === STATUS.SUCCESS &&
				<InputFields>
					{
						educationInformation.educations.map((education, index) => (
							<EducationInstance
								key={index}
								education={education}
								index={index}
								handleChange={handleChange}
								handleClose={removeEducationInstance}
							/>
						))
					}
					<InputSubmit
						theme={'secondary-button'}
						text={"+ Add"}
						styles={
							{
								width: "20%"
							}
						}
						handleClick={addEducationInstance}
					/>
					<InputSubmit
						text={"Save"}
						handleClick={saveEducationInformation}
						isDisabled={updateEducationInformationStatus === STATUS.STARTED}
						loader={updateEducationInformationStatus === STATUS.STARTED}
					/>
				</InputFields>
			}
		</div>
	)
};

EducationInformation.propTypes = {};

const EducationInstance = ({education, index, handleChange, handleClose}) => {

	useEffect(
		() => {
			handleChange(
				{
					target: {
						name: 'isCGPA',
						value: (education.isPercentage !== "true").toString()
					}
				},
				index
			);

		},
		[education.isPercentage]
	);
	useEffect(
		() => {
			handleChange(
				{
					target: {
						name: 'isPercentage',
						value: (education.isCGPA !== "true").toString()
					}
				},
				index
			);

		},
		[education.isCGPA]
	);


	return (
		<div className="education-container multiple-instances">
			<div className="educationFields-container multiple-instances-fields">
				<InputSelect
					id={'type'}
					name={'type'}
					iconName={"book-open"}
					value={education.type}
					handleChange={(event) => handleChange(event, index)}
					placeholder={'Type of education degree'}
					options={
						[
							{
								text: "Type of education degree",
								value: "default",
								isDefault: true
							},
							{
								text: "Secondary School",
								value: "secondary"
							},
							{
								text: "Senior Secondary School",
								value: "seniorSecondary"
							},
							{
								text: "Graduation",
								value: "graduation"
							},
							{
								text: "Post Graduation",
								value: "postGraduation"
							}
						]
					}
				/>
				<InputText
					id={'instituteName'}
					name={'instituteName'}
					iconName={"school"}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"Name of Institute/College/School"}
					value={education.instituteName}
				/>
				<InputText
					id={"university"}
					name={"university"}
					iconName={"university"}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"Name of University/Board"}
					value={education.university}
				/>
				<InputDate
					id={"startDate"}
					name={"startDate"}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"Start date of the course"}
					value={education.startDate}
					completeDate={false}
				/>
				<InputDate
					id={"endDate"}
					name={"endDate"}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"End date of the course"}
					value={education.endDate}
					disabled={education.isPresent === 'true'}
					completeDate={false}
				/>
				<InputToggle
					id={'isPresent'}
					name={'isPresent'}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"Present?"}
					value={education.isPresent === 'true'}
				/>
				<InputText
					id={'course'}
					name={'course'}
					iconName={"book"}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"Name of course/stream"}
					value={education.course}
					disabled={education.type === 'secondary'}
				/>
				<InputNumber
					id={'score'}
					name={'score'}
					iconName={"star-half-alt"}
					handleChange={(event) => handleChange(event, index)}
					placeholder={"Score"}
					value={education.score}
					minCap={1}
					maxCap={education.isPercentage === 'true' ? 100 : 10}
					checkValue={(value) => {
						if (value < 1) {
							return [true, `${ERROR_MESSAGES.NUMBER_OUT_OF_RANGE} - should be more than 1.`]
						}
						if (education.isPercentage === "true" && value > 100) {
							return [true, `${ERROR_MESSAGES.NUMBER_OUT_OF_RANGE} - percentage can be maximum 100%`]
						}
						if (education.isCGPA === "true" && value > 10) {
							return [true, `${ERROR_MESSAGES.NUMBER_OUT_OF_RANGE} - CGPA can be maximum 10 CPGA points.`]
						}
						return [false, ''];
					}}
				/>
				<InputToggle
					id={"isPercentage"}
					name={"isPercentage"}
					handleChange={(event) => handleChange(event, index)}
					value={education.isPercentage === "true"}
					placeholder={'Percentage'}
				/>
				<InputToggle
					id={"isCGPA"}
					name={"isCGPA"}
					handleChange={(event) => handleChange(event, index)}
					value={education.isCGPA === "true"}
					placeholder={"CGPA"}
				/>
			</div>
			<div className="multiple-instances-close-container">
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
EducationInstance.propTypes = {
	education: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default EducationInformation