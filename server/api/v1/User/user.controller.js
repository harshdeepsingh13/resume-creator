import {getToken} from "../../../services/jwt.service";
import {comparePassword, encryptPassword} from "../../../services/password.service";
import {
	deleteEducationInformation,
	deleteProject,
	deleteTraining,
	deleteWorkExperience,
	getBasicInformation,
	getCompleteInformation,
	getEducationInformation,
	getProjectInformation,
	getSkillInformation,
	getTrainingInformation,
	getUser,
	getWorkExperiences,
	registerUser,
	updateBasicInformation,
	updateEducationInformation,
	updateProjectInformation,
	updateSkillInformation,
	updateTrainingInformation,
	updateWorkExperiences
} from "./user.model";
import config from '../../../config/config';
import {getAvatarLink} from '../../../services/cloudinary.service';
import checkWebsiteLink from '../../../services/checkWebsiteLink.service';

const {logger} = config;

export const loginController = async (req, res, next) => {
	const {
		email,
		password,
		mode = config.tokenModes.normal
	} = req.body;

	if (!email || !password) {
		req.error = {
			status: 400,
			message: "Bad Request"
		};
		return next(new Error());
	}
	try {
		const response = await getUser(email, true);
		if (!response || (response && !await comparePassword(response.password, password))) {
			req.error = {
				status: 404,
				message: "User Not Found"
			};
			return next(new Error());
		}
		res.status(200).json(
			{
				status: "200",
				message: "successful",
				data: {
					name: response.name,
					email: response.email,
					avatar: getAvatarLink(response.avatar.uploadId),
					token: getToken({
						userId: response._id,
						email: response.email,
						mode
					})
				}
			}
		);
		logger.info(`[ user.controller.js ]User with email as ${response.email} has been logged in, with mode ${mode}`)
	} catch (e) {
		next(e);
	}
};

export const registerController = async (req, res, next) => {
	const {
		name,
		email
	} = req.body;
	let {
		password
	} = req.body;

	if (!name || !email || !password) {
		req.error = {
			status: 400,
			message: "Bad Request"
		};
		return next(new Error());
	}
	try {
		password = await encryptPassword(password);
		await registerUser({
			name,
			email,
			password
		});
		res.status(200).json({
			status: 200,
			message: "User registered successfully"
		});
		logger.info(`[ user.controller.js ] User register successfully with email as ${email}`);
	} catch (e) {
		next(e);
	}

};

export const getBasicInformationController = async (req, res, next) => {
	try {
		const basicInformation = await getBasicInformation(req.user.email);
		res.status(200).json({
			status: 200,
			message: "Basic information retrieved successfully",
			data: {
				basicInformation
			}
		});
		logger.info(`[ user.controller.js ] Basic information for the user having email as ${req.user.email} has been sent.`)
	} catch (e) {
		next(e);
	}
};

export const updateBasicInformationController = async (req, res, next) => {
	const {
		basicInformation,
		basicInformation: {
			objective,
			website
		}
	} = req.body;
	if (objective > 200) {
		req.error = {
			status: 411,
			message: "Profile Objective should not be more than 200 characters"
		};
		next(new Error());
	}
	if (checkWebsiteLink(website)) {
		req.error = {
			status: 411,
			message: "Website link is not valid"
		};
		next(new Error());
	}
	try {
		const updatedInformation = await updateBasicInformation(req.user.email, basicInformation);
		res.status(200).json(
			{
				status: 200,
				message: "Information successfully updated.",
				data: {
					updatedInformation
				}
			}
		);
	} catch (e) {
		next(e);
	}
};

export const updateEducationInformationController = async (req, res, next) => {
	try {
		const {
			educationInformation
		} = req.body;
		for (let {isPercentage, isCGPA} of educationInformation) {
			if ((isPercentage && isCGPA) || (!isPercentage && !isCGPA)) {
				req.error = {
					status: 400,
					message: 'Out of percentage and CGPA only and at most one has to be true.'
				};
				next(new Error());
			}
		}
		let updated = await updateEducationInformation(req.user.email, educationInformation);
		res.status(200).json(
			{
				status: 200,
				message: "Information successfully updated.",
				data: [
					...updated
				]
			}
		)
	} catch (e) {
		next(e);
	}
};

export const getEducationInformationController = async (req, res, next) => {
	try {
		const educationInformation = await getEducationInformation(req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "education information successfully retrieved.",
				data: {
					educationInformation
				}
			}
		);
	} catch (e) {
		next(e);
	}
};

export const updateSkillInformationController = async (req, res, next) => {
	try {
		const {
			skills
		} = req.body;

		const updated = await updateSkillInformation(skills, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "Skills updated successfully",
				data: {
					...updated
				}
			}
		)
	} catch (e) {
		next(e);
	}
};

export const getSkillInformationController = async (req, res, next) => {
	try {
		const {skills} = await getSkillInformation(req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "data successfully retrieved",
				data: {
					skills
				}
			}
		)
	} catch (e) {
		next(e);
	}
};

export const updateWorkExperiencesController = async (req, res, next) => {
	try {
		const {workExperiences} = req.body;
		const updated = await updateWorkExperiences(workExperiences, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "Work experiences successfully updated",
				data: [
					...updated
				]
			}
		)
	} catch (e) {
		next(e);
	}
};

export const getWorkExperiencesController = async (req, res, next) => {
	try {
		const {workExperienceInformation} = await getWorkExperiences(req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "data successfully retrieved",
				data: {
					workExperiences: workExperienceInformation.workExperiences
				}
			}
		)
	} catch (e) {
		next(e);
	}
};

export const getProjectInformationController = async (req, res, next) => {
	try {
		const {projectsInformation} = await getProjectInformation(req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "data successfully retrieved",
				data: {
					projects: projectsInformation ? projectsInformation.projects : [] // correct this before commenting.
				}
			}
		)
	} catch (e) {
		next(e);
	}
};

export const updatedProjectInformationController = async (req, res, next) => {
	try {
		const {projects} = req.body;
		const updated = await updateProjectInformation(projects, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "projects information successfully updated.",
				data: [
					...updated
				]
			}
		);
	} catch (e) {
		next(e);
	}
};

export const deleteProjectInformationController = async (req, res, next) => {
	try {
		const {projectId} = req.body;
		if (!projectId) {
			req.error = {
				status: 400,
				message: 'Project Id is missing from the body.'
			};
			next(new Error());
		}
		const {projectsInformation} = await deleteProject(projectId, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "delete successful",
				data: [
					...projectsInformation.projects
				]
			}
		);
	} catch (e) {
		next(e);
	}
};

export const deleteWorkExperienceController = async (req, res, next) => {
	try {
		const {workExperienceId} = req.body;
		if (!workExperienceId) {
			res.error = {
				status: 400,
				message: "work experience Id is required in the request body."
			};
			next(new Error());
		}
		const {workExperienceInformation} = await deleteWorkExperience(workExperienceId, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "delete successful",
				data: [
					...workExperienceInformation.workExperiences
				]
			}
		)
	} catch (e) {
		next(e);
	}
};

export const deleteEducationInformationController = async (req, res, next) => {
	try {
		const {educationId} = req.body;
		if (!educationId) {
			req.error = {
				status: 400,
				message: "Education ID is required in request body."
			};
			next(new Error());
		}
		const {educationInformation} = await deleteEducationInformation(educationId, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: 'delete successful',
				data: [
					...educationInformation.educations
				]

			}
		)
	} catch (e) {
		next(e);
	}
};

export const getCompleteInformationController = async (req, res, next) => {
	try {
		const information = await getCompleteInformation(req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "complete information retrieval successful",
				data: {
					...information
				}
			}
		)
	} catch (e) {
		next(e);
	}
};

export const updatedTrainingInformationController = async (req, res, next) => {
	try {
		const {trainings} = req.body;
		const updated = await updateTrainingInformation(trainings, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "Trainings information successfully updated.",
				data: [
					...updated
				]
			}
		);
	} catch (e) {
		next(e);
	}
};

export const deleteTrainingInformationController = async (req, res, next) => {
	try {
		const {trainingId} = req.body;
		if (!trainingId) {
			req.error = {
				status: 400,
				message: 'Training Id is missing from the body.'
			};
			next(new Error());
		}
		const {trainingInformation} = await deleteTraining(trainingId, req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "delete successful",
				data: [
					...trainingInformation.trainings
				]
			}
		);
	} catch (e) {
		next(e);
	}
};

export const getTrainingInformationController = async (req, res, next) => {
	try {
		const {trainingInformation} = await getTrainingInformation(req.user.email);
		res.status(200).json(
			{
				status: 200,
				message: "data successfully retrieved",
				data: {
					trainings: trainingInformation ? trainingInformation.trainings : [] // correct this before commenting.
				}
			}
		)
	} catch (e) {
		next(e);
	}
};
