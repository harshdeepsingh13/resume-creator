import mongoose from "mongoose";

import UserSchema from '../../../schemas/user.schema';
import EducationsSchema from "../../../schemas/educations.schema";
import WorkExperienceSchema from "../../../schemas/workExperience.schema";
import ProjectSchema from "../../../schemas/project.schema";
import TrainingSchema from '../../../schemas/trainings.schema';

const basicInformationProjection = {
	_id: 0,
	name: 1,
	tags: 1,
	objective: 1,
	avatar: 1,
	email: 1,
	contactNumber: 1,
	currentLocation: 1,
	dob: 1,
	website: 1,
	socialMediaLinks: 1
};
const userInformationProjection = {
	_id: 0,
	name: 1,
	email: 1,
	avatar: 1
};
const educationInformationProjection = {
	_id: 0,
	educationInformation: 1
};
const skillInformationProjection = {
	_id: 0,
	skills: 1
};
const workExperienceProjection = {
	_id: 0,
	workExperienceInformation: 1
};
const projectsProjection = {
	_id: 0,
	projectsInformation: 1
};
const trainingsProjection = {
	_id: 0,
	trainingInformation: 1
};

const User = mongoose.model("User", UserSchema);
const WorkExperience = mongoose.model("WorkExperience", WorkExperienceSchema);
const EducationDetail = mongoose.model("EducationDetail", EducationsSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Training = mongoose.model("Training", TrainingSchema);

export const registerUser = user => {
	const newUser = new User({...user});
	return newUser.save();
};

export const getUser = (email, wantPassword = false) => {
	const projectionObject = {...userInformationProjection};

	if (wantPassword) projectionObject.password = 1;

	return User.findOne(
		{
			email
		},
		projectionObject
	);
};

export const getBasicInformation = email =>
	User.findOne(
		{
			email
		},
		basicInformationProjection
	);

export const updateBasicInformation = (userEmail, basicInformation) => {
	const {
		name,
		socialMediaLinks,
		email,
		avatar,
		contactNumber,
		dob,
		objective,
		state,
		country,
		tags,
		website
	} = basicInformation
	return User.findOneAndUpdate(
		{
			email: userEmail
		},
		{
			name,
			avatar: {
				uploadId: avatar.uploadId
			},
			contactNumber,
			dob,
			objective,
			currentLocation: {
				state,
				country
			},
			tags,
			website,
			socialMediaLinks
		},
		{
			new: true,
			useFindAndModify: false,
			fields: {...basicInformationProjection}
		}
	)
};

export const updateEducationInformation = async (email, educationInformation) => {
	const updated = [];
	educationInformation = educationInformation.map(education => {
		if (education.type === 'postGraduation') education.priority = 0;
		if (education.type === 'graduation') education.priority = 1;
		if (education.type === 'seniorSecondary') education.priority = 2;
		if (education.type === 'secondary') education.priority = 3;
		if (!education._id) education._id = new mongoose.Types.ObjectId();
		return education
	});

	for (let education of educationInformation) {
		const updatedRecord = await EducationDetail.findOneAndUpdate(
			{user: email, _id: education._id},
			{...education},
			{upsert: true, new: true, useFindAndModify: false}
		);
		updated.push(updatedRecord);
	}
	return updated;
};

export const getEducationInformation = async email => {
	const educationInformation = await EducationDetail.find(
		{
			user: email
		},
		{},
		{
			sort: {priority: 1}
		}
	);
	return {educationInformation: {educations: [...educationInformation]}};
};

export const updateSkillInformation = (skills, email) =>
	User.findOneAndUpdate(
		{
			email
		},
		{
			skills
		},
		{
			new: true,
			useFindAndModify: false,
			fields: {...skillInformationProjection}
		}
	);

export const getSkillInformation = email =>
	User.findOne(
		{
			email
		},
		{
			...skillInformationProjection
		}
	);

export const updateWorkExperiences = async (workExperiences, email) => {
	const updated = [];

	for (let workExperience of workExperiences) {
		if (!workExperience._id) workExperience._id = new mongoose.Types.ObjectId();
		const updatedRecord = await WorkExperience.findOneAndUpdate(
			{
				user: email,
				_id: workExperience._id
			},
			{
				...workExperience,
			},
			{
				new: true,
				upsert: true,
				useFindAndModify: false
			}
		);
		updated.push(updatedRecord);
	}
	return updated;
};

export const getWorkExperiences = email =>
	WorkExperience.find(
		{
			user: email
		},
		{},
		{
			sort: {startDate: -1}
		}
	);


export const getProjectInformation = email =>
	Project.find(
		{
			user: email
		},
		{},
		{
			sort: {startDate: -1}
		}
	);

export const updateProjectInformation = async (projects, email) => {
	const updated = [];

	for (let project of projects) {
		if (!project._id) project._id = new mongoose.Types.ObjectId();
		const updatedRecord = await Project.findOneAndUpdate(
			{
				user: email,
				_id: project._id
			},
			{
				...project
			},
			{
				new: true,
				useFindAndModify: false,
				upsert: true
			}
		);
		updated.push(updatedRecord);
	}
	return updated;
};

export const getTrainingInformation = email =>
	Training.find(
		{
			user: email
		},
		{},
		{
			sort: {startDate: -1}
		}
	);

export const updateTrainingInformation = async (trainings, email) => {
	const updated = [];

	for (let training of trainings) {
		if (!training._id) training._id = new mongoose.Types.ObjectId();
		const updatedRecord = await Training.findOneAndUpdate(
			{
				user: email,
				_id: training._id
			},
			{
				...training
			},
			{
				new: true,
				useFindAndModify: false,
				upsert: true
			}
		);
		updated.push(updatedRecord);
	}
	return updated;
};

export const deleteTraining = (trainingId, email) =>
	Training.findOneAndDelete(
		{
			user: email,
			_id: trainingId
		},
		{
			useFindAndModify: false,
		}
	);


export const deleteProject = (projectId, email) =>
	Project.findOneAndDelete(
		{
			user: email,
			_id: projectId
		},
		{
			useFindAndModify: false,
		}
	);

export const deleteWorkExperience = (workExperienceId, email) =>
	WorkExperience.findOneAndDelete(
		{
			user: email,
			_id: workExperienceId
		},
		{
			useFindAndModify: false
		}
	);

export const deleteEducationInformation = (educationId, email) =>
	EducationDetail.findOneAndDelete(
		{
			_id: educationId,
			user: email
		},
		{
			useFindAndModify: false,
		}
	);

export const getCompleteInformation = async email => ({
	basicInformation: await getBasicInformation(email),
	educationInformation: await getEducationInformation(email),
	skillsInformation: await getSkillInformation(email),
	workExperienceInformation: await getWorkExperiences(email),
	trainingInformation: await getTrainingInformation(email),
	projects: await getProjectInformation(email)
});
