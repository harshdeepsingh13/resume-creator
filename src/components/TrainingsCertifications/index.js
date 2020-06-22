import React, {useEffect, useState} from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {STATUS, STYLE_CONSTANTS} from "../../config/config";
import {deleteTraining, getTrainingsInformation, updatedTrainingInformation} from "../../services/axios.service";
import Loader from "../Loader";
import SuccessAlert from "../SuccessAlert";
import {InputDate, InputFields, InputSubmit, InputText, InputTextArea, InputToggle} from "../InputFields";
import {checkWebsiteLink} from "../../services/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TrainingsCertifications = props => {
	const [trainingsInformation, setTrainingsInformation] = useState(
		{
			status: STATUS.DEFAULT,
			trainings: []
		}
	);
	const [updateTrainingsInformationStatus, setUpdateTrainingsInformationStatus] = useState(STATUS.DEFAULT);

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      },
	                      index) => {
		setTrainingsInformation(
			{
				...trainingsInformation,
				trainings: [
					...trainingsInformation.trainings.slice(0, index),
					{
						...trainingsInformation.trainings[index],
						[name]: value
					},
					...trainingsInformation.trainings.slice(index + 1)
				]
			}
		)
	};
	const removeTraining = (index) => {
		trainingsInformation.trainings[index]._id && deleteTraining(trainingsInformation.trainings[index]._id);
		if (trainingsInformation.trainings.length !== 1) {
			setTrainingsInformation(
				{
					...trainingsInformation,
					trainings: [
						...trainingsInformation.trainings.slice(0, index),
						...trainingsInformation.trainings.slice(index + 1)
					]
				}
			)
		} else {
			setTrainingsInformation(
				{
					...trainingsInformation,
					trainings: [
						{
							name: undefined,
							startDate: undefined,
							endDate: undefined,
							summary: undefined,
							link: undefined
						}
					]
				}
			)
		}
	};
	const addTraining = () => {
		setTrainingsInformation(
			{
				...trainingsInformation,
				trainings: [
					...trainingsInformation.trainings,
					{
						name: undefined,
						startDate: undefined,
						endDate: undefined,
						summary: undefined,
						link: undefined
					}
				]
			}
		)
	};
	const saveTrainingInformation = async () => {
		try {
			setUpdateTrainingsInformationStatus(STATUS.STARTED);
			setTrainingsInformation(
				{
					...trainingsInformation,
					status: STATUS.STARTED
				}
			);
			const {data: {data: trainings}} = await updatedTrainingInformation([...trainingsInformation.trainings]);
			setTrainingsInformation(
				{
					...trainingsInformation,
					status: STATUS.SUCCESS,
					trainings: [
						...trainings.map(training => (
							{
								...training,
								startDate: new Date(training.startDate).toISOString().slice(0, 10),
								endDate: training.endDate ? new Date(training.endDate).toISOString().slice(0, 10) : undefined
							}
						))
					]
				}
			);
			setUpdateTrainingsInformationStatus(STATUS.SUCCESS);
		} catch (e) {
			console.log('error if saving training information');
		}
	};

	useEffect(
		() => {
			(async () => {
				try {
					setTrainingsInformation(
						{
							...trainingsInformation,
							status: STATUS.STARTED
						}
					);
					const {data: {data: {trainings}}} = await getTrainingsInformation();
					setTrainingsInformation(
						{
							...trainingsInformation,
							status: STATUS.SUCCESS,
							trainings: trainings.length ?
								[
									...trainings.map(training => (
										{
											...training,
											startDate: new Date(training.startDate).toISOString().slice(0, 10),
											endDate: training.endDate ? new Date(training.endDate).toISOString().slice(0, 10) : undefined
										}
									))
								] :
								[
									{
										name: undefined,
										startDate: undefined,
										endDate: undefined,
										summary: undefined,
										link: undefined
									}
								]
						}
					)
				} catch (e) {
					console.log('error in fetching trainings Information', e);
				}
			})()
		},
		[]
	);

	return (
		<div className="trainingsInformation-container">
			{
				trainingsInformation.status === STATUS.STARTED &&
				<Loader/>
			}
			{
				updateTrainingsInformationStatus === STATUS.SUCCESS &&
				<SuccessAlert
					title={"Your updates are successfully saved!"}
					onSuccess={() => setUpdateTrainingsInformationStatus(STATUS.DEFAULT)}
				/>
			}
			{
				trainingsInformation.status === STATUS.SUCCESS &&
				<InputFields>
					{
						trainingsInformation.trainings.map((training, index) => (
							<TrainingInstance
								key={index}
								index={index}
								training={training}
								handleChange={handleChange}
								handleClose={removeTraining}
							/>
						))
					}
					<InputSubmit
						text={"+ Add"}
						theme={"secondary-button"}
						handleClick={addTraining}
						styles={
							{
								width: '20%'
							}
						}
					/>
					<InputSubmit
						text={"Save"}
						handleClick={saveTrainingInformation}
						isDisabled={updateTrainingsInformationStatus === STATUS.STARTED}
						loader={updateTrainingsInformationStatus === STATUS.STARTED}
						styles={{width: '80%'}}
					/>
				</InputFields>
			}
		</div>
	)
};

TrainingsCertifications.propTypes = {};

const TrainingInstance = ({training, handleChange, handleClose, index}) => {
	return (
		<div className="trainingInstance-container multiple-instances">
			<div className="projectInstanceFields-container multiple-instances-fields">
				<InputText
					id={"name"}
					name={"name"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Name of the Training/Certification"}
					value={training.name}
				/>
				<InputDate
					id={"startDate"}
					name={"startDate"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Start Date"}
					value={training.startDate}
					completeDate={true}
				/>
				<InputDate
					id={"endDate"}
					name={"endDate"}
					handleChange={event => handleChange(event, index)}
					placeholder={"End Date"}
					value={training.endDate}
					completeDate={true}
				/>
				<InputTextArea
					id={"summary"}
					name={"summary"}
					characterLimit={1000}
					handleChange={event => handleChange(event, index)}
					placeholder={"Summary of the Training/Certification"}
					value={training.summary}
				/>
				<InputText
					id={"link"}
					name={"link"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Link to the certification"}
					value={training.link}
					checkValue={checkWebsiteLink}
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

TrainingInstance.propTypes = {
	training: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default TrainingsCertifications
