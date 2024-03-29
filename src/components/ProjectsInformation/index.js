import React, {useEffect, useState} from 'react';
import './styles.scss';
import {InputDate, InputFields, InputSubmit, InputTags, InputText, InputTextArea, InputToggle} from "../InputFields";
import {STATUS, STYLE_CONSTANTS} from "../../config/config";
import Loader from "../Loader";
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {checkWebsiteLink} from "../../services/utils";
import {deleteProject, getProjectsInformation, updatedProjectInformation} from "../../services/axios.service";
import SuccessAlert from "../SuccessAlert";

const ProjectsInformation = props => {
	const [projectsInformation, setProjectsInformation] = useState(
		{
			status: STATUS.DEFAULT,
			projects: []
		}
	);
	const [updateProjectsInformationStatus, setUpdateProjectsInformationStatus] = useState(STATUS.DEFAULT);

	const handleChange = ({
		                      target: {
			                      name,
			                      value
		                      }
	                      },
	                      index) => {
		setProjectsInformation(
			{
				...projectsInformation,
				projects: [
					...projectsInformation.projects.slice(0, index),
					{
						...projectsInformation.projects[index],
						[name]: value
					},
					...projectsInformation.projects.slice(index + 1)
				]
			}
		)
	};
	const removeProject = (index) => {
		projectsInformation.projects[index]._id && deleteProject(projectsInformation.projects[index]._id);
		if (projectsInformation.projects.length !== 1) {
			setProjectsInformation(
				{
					...projectsInformation,
					projects: [
						...projectsInformation.projects.slice(0, index),
						...projectsInformation.projects.slice(index + 1)
					]
				}
			)
		} else {
			setProjectsInformation(
				{
					...projectsInformation,
					projects: [
						{
							name: undefined,
							startDate: undefined,
							endDate: undefined,
							isPresent: "false",
							summary: undefined,
							link: undefined,
							website: undefined,
							technologyStack: []
						}
					]
				}
			)
		}
	};
	const addProject = () => {
		setProjectsInformation(
			{
				...projectsInformation,
				projects: [
					...projectsInformation.projects,
					{
						name: undefined,
						startDate: undefined,
						endDate: undefined,
						isPresent: "false",
						summary: undefined,
						link: undefined,
						website: undefined,
						technologyStack: []
					}
				]
			}
		)
	};
	const saveProjectInformation = async () => {
		try {
			setUpdateProjectsInformationStatus(STATUS.STARTED);
			setProjectsInformation(
				{
					...projectsInformation,
					status: STATUS.STARTED
				}
			);
			const {data: {data: projects}} = await updatedProjectInformation([
				...projectsInformation.projects.map(project => (
					{
						...project,
						isPresent: project.isPresent === "true"
					}
				))
			]);
			setProjectsInformation(
				{
					...projectsInformation,
					status: STATUS.SUCCESS,
					projects: [
						...projects.map(project => (
							{
								...project,
								isPresent: project.isPresent.toString(),
								startDate: new Date(project.startDate).toISOString().slice(0, 7),
								endDate: project.endDate ? new Date(project.endDate).toISOString().slice(0, 7) : undefined
							}
						))
					]
				}
			);
			setUpdateProjectsInformationStatus(STATUS.SUCCESS);
		} catch (e) {
			console.log('error if saving project information');
		}
	};

	useEffect(
		() => {
			(async () => {
				try {
					setProjectsInformation(
						{
							...projectsInformation,
							status: STATUS.STARTED
						}
					);
					const {data: {data: {projects}}} = await getProjectsInformation();
					setProjectsInformation(
						{
							...projectsInformation,
							status: STATUS.SUCCESS,
							projects: projects.length ?
								[
									...projects.map(project => (
										{
											...project,
											isPresent: project.isPresent.toString(),
											startDate: new Date(project.startDate).toISOString().slice(0, 7),
											endDate: project.endDate ? new Date(project.endDate).toISOString().slice(0, 7) : undefined,
											technologyStack: project.technologyStack || []
										}
									))
								] :
								[
									{
										name: undefined,
										startDate: undefined,
										endDate: undefined,
										isPresent: "false",
										summary: undefined,
										link: undefined,
										website: undefined,
										technologyStack: []
									}
								]
						}
					)
				} catch (e) {
					console.log('error in fetching projects Information', e);
				}
			})()
		},
		[]
	);

	return (
		<div className="projectsInformation-container">
			{
				projectsInformation.status === STATUS.STARTED &&
				<Loader/>
			}
			{
				updateProjectsInformationStatus === STATUS.SUCCESS &&
				<SuccessAlert
					title={"Your updates are successfully saved!"}
					onSuccess={() => setUpdateProjectsInformationStatus(STATUS.DEFAULT)}
				/>
			}
			{
				projectsInformation.status === STATUS.SUCCESS &&
				<InputFields>
					{
						projectsInformation.projects.map((project, index) => (
							<ProjectInstance
								key={index}
								index={index}
								project={project}
								handleChange={handleChange}
								handleClose={removeProject}
							/>
						))
					}
					<InputSubmit
						text={"+ Add"}
						theme={"secondary-button"}
						handleClick={addProject}
						styles={
							{
								width: '20%'
							}
						}
					/>
					<InputSubmit
						text={"Save"}
						handleClick={saveProjectInformation}
						isDisabled={updateProjectsInformationStatus === STATUS.STARTED}
						loader={updateProjectsInformationStatus === STATUS.STARTED}
					/>
				</InputFields>
			}
		</div>
	)
};

ProjectsInformation.propTypes = {};

const ProjectInstance = ({project, handleChange, handleClose, index}) => {
	return (
		<div className="projectInstance-container multiple-instances">
			<div className="projectInstanceFields-container multiple-instances-fields">
				<InputText
					id={`projectsInformation-${index}-name`}
					name={"name"}
					handleChange={event => handleChange(event, index)}
					iconName={"signature"}
					placeholder={"Name of the Project"}
					value={project.name}
				/>
				<InputDate
					id={`projectsInformation-${index}-startDate`}
					name={"startDate"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Start Date"}
					value={project.startDate}
				/>
				<InputDate
					id={`projectsInformation-${index}-endDate`}
					name={"endDate"}
					handleChange={event => handleChange(event, index)}
					placeholder={"End Date"}
					value={project.endDate}
					disabled={project.isPresent === "true"}
				/>
				<InputToggle
					id={`projectsInformation-${index}-isPresent`}
					name={"isPresent"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Still in development?"}
					value={project.isPresent === "true"}
				/>
				<InputTextArea
					id={`projectsInformation-${index}-summary`}
					name={"summary"}
					characterLimit={2000}
					handleChange={event => handleChange(event, index)}
					placeholder={"Describe the project"}
					value={project.summary}
				/>
				<InputText
					id={`projectsInformation-${index}-link`}
					name={"link"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Link to the project repository"}
					value={project.link}
					iconName={['fab', 'github']}
					checkValue={checkWebsiteLink}
				/>
				<InputText
					id={`projectsInformation-${index}-website`}
					name={"website"}
					handleChange={event => handleChange(event, index)}
					placeholder={"Link to the website"}
					iconName={"link"}
					value={project.website}
					checkValue={checkWebsiteLink}
				/>
				<InputTags
					id={`projectsInformation-${index}-technologyStack`}
					name={'technologyStack'}
					placeholder={'Technology Stack of the Project'}
					iconName={"layer-group"}
					handleChange={event => handleChange(event, index)}
					value={project.technologyStack}
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

ProjectInstance.propTypes = {
	project: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default ProjectsInformation
