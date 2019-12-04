const {getPayload, getToken} = require("../../../services/jwt.service");
const {comparePassword, encryptPassword} = require("../../../services/password.service");
const {getUser, registerUser, getBasicInformation, updateBasicInformation, updateEducationInformation, getEducationInformation, updateSkillInformation, getSkillInformation, updateWorkExperiences, getWorkExperiences} = require("./user.model");
const {logger} = require('../../../config/config');
const {getAvatarLink} = require('../../../services/cloudinary.service');
const checkWebsiteLink = require('../../../services/checkWebsiteLink.service');

exports.loginController = async (req, res, next) => {
	const {
		email,
		password
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
						email: response.email
					})
				}
			}
		);
		logger.info(`[ user.controller.js ]User with email as ${response.email} has been logged in `)
	} catch (e) {
		next(e);
	}
};

exports.registerController = async (req, res, next) => {
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

exports.getBasicInformationController = async (req, res, next) => {
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

exports.updateBasicInformationController = async (req, res, next) => {
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

exports.updateEducationInformationController = async (req, res, next) => {
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

exports.getEducationInformationController = async (req, res, next) => {
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

exports.updateSkillInformationController = async (req, res, next) => {
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

exports.getSkillInformationController = async (req, res, next) => {
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

exports.updateWorkExperiencesController = async (req, res, next) => {
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

exports.getWorkExperiencesController = async (req, res, next) => {
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