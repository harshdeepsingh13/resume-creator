const mongoose = require('mongoose');

const ImageSchema = require('../../../schemas/image.schema');
const LocationSchema = require('../../../schemas/location.schema');
const SocialMediaLinksSchema = require('../../../schemas/socialMediaLinks.schema');
const EducationsSchema = require('../../../schemas/educations.schema');
const WorkExperienceSchema = require('../../../schemas/workExperience.schema');
const ProjectSchema = require('../../../schemas/project.schema');

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

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			index: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		avatar: {
			type: ImageSchema,
			default: new mongoose.model("image", ImageSchema)
		},
		tags: {
			type: Array
		},
		objective: {
			type: String
		},
		contactNumber: {
			type: Number
		},
		currentLocation: {
			type: LocationSchema
		},
		dob: {
			type: Date
		},
		website: {
			type: String
		},
		socialMediaLinks: {
			type: SocialMediaLinksSchema
		},
		educationInformation: {
			educations: {
				type: [EducationsSchema]
			}
		},
		skills: {
			type: Array
		},
		workExperienceInformation: {
			workExperiences: {
				type: [WorkExperienceSchema]
			}
		},
		projectsInformation: {
			projects: {
				type: [ProjectSchema]
			}
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);

const User = mongoose.model("User", UserSchema);

exports.registerUser = user => {
	const newUser = new User({...user});
	return newUser.save();
};

exports.getUser = (email, wantPassword = false) => {
	const projectionObject = {...userInformationProjection};

	if (wantPassword) projectionObject.password = 1;

	return User.findOne(
		{
			email
		},
		projectionObject
	);
};

exports.getBasicInformation = email =>
	User.findOne(
		{
			email
		},
		basicInformationProjection
	);

exports.updateBasicInformation = (userEmail, basicInformation) => {
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

exports.updateEducationInformation = async (email, educationInformation) => {
	/*const updateObject = {
		educationInformation: {
			educations:[...educationInformation]
		}
	}*/
	const updated = {};
	educationInformation = educationInformation.map(education => {
		if (education.type === 'postGraduation') education.priority = 0;
		if (education.type === 'graduation') education.priority = 1;
		if (education.type === 'seniorSecondary') education.priority = 2;
		if (education.type === 'secondary') education.priority = 3;
		console.log('education', education);
		return education
	});
	const toUpdate = educationInformation.filter(education => education._id);
	const toPush = educationInformation.filter(education => !education._id);

	for (let educationDetail of toUpdate) {
		const updatedRecord = await User.findOneAndUpdate(
			{
				email,
				'educationInformation.educations._id': educationDetail._id
			},
			{
				$set: {
					'educationInformation.educations.$.isPercentage': educationDetail.isPercentage,
					'educationInformation.educations.$.isPresent': educationDetail.isPresent,
					'educationInformation.educations.$.isCGPA': educationDetail.isCGPA,
					'educationInformation.educations.$.type': educationDetail.type,
					'educationInformation.educations.$.instituteName': educationDetail.instituteName,
					'educationInformation.educations.$.university': educationDetail.university,
					'educationInformation.educations.$.startDate': educationDetail.startDate,
					'educationInformation.educations.$.endDate': educationDetail.endDate,
					'educationInformation.educations.$.score': educationDetail.score
				}
			},
			{
				new: true,
				fields: {...educationInformationProjection},
				useFindAndModify: false
			}
		);
		updatedRecord && updatedRecord.educationInformation.educations.forEach(record => updated[record._id] = record);
	}
	for (let educationDetail of toPush) {
		const updatedRecord = await User.findOneAndUpdate(
			{
				email
			},
			{
				$push: {
					'educationInformation.educations': {
						...educationDetail
					}
				}
			},
			{
				new: true,
				fields: {...educationInformationProjection},
				runValidators: true,
				useFindAndModify: false
			}
		);
		updatedRecord && updatedRecord.educationInformation.educations.forEach(record => updated[record._id] = record);
	}
	return Object.entries(updated).map(([, value]) => value);
};

exports.getEducationInformation = async email => {
	const educationInformation = await User.findOne(
		{
			email
		},
		{
			...educationInformationProjection
		}
	);
	educationInformation.educationInformation.educations.sort((education_one, education_two) => {
		return education_one.priority - education_two.priority
	});
	return educationInformation;
};

exports.updateSkillInformation = (skills, email) =>
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

exports.getSkillInformation = email =>
	User.findOne(
		{
			email
		},
		{
			...skillInformationProjection
		}
	);

exports.updateWorkExperiences = async (workExperiences, email) => {
	const toUpdate = workExperiences.filter(workExperience => workExperience._id);
	const toPush = workExperiences.filter(workExperience => !workExperience._id);
	const updated = {};

	for (let workExperience of toUpdate) {
		const updatedRecord = await User.findOneAndUpdate(
			{
				email,
				'workExperienceInformation.workExperiences._id': workExperience._id
			},
			{
				$set: {
					'workExperienceInformation.workExperiences.$.company': workExperience.company,
					'workExperienceInformation.workExperiences.$.position': workExperience.position,
					'workExperienceInformation.workExperiences.$.startDate': workExperience.startDate,
					'workExperienceInformation.workExperiences.$.endDate': workExperience.endDate,
					'workExperienceInformation.workExperiences.$.isPresent': workExperience.isPresent,
					'workExperienceInformation.workExperiences.$.responsibilities': workExperience.responsibilities,
					'workExperienceInformation.workExperiences.$.location': workExperience.location
				}
			},
			{
				new: true,
				fields: {...workExperienceProjection},
				useFindAndModify: false
			}
		);
		updatedRecord && updatedRecord.workExperienceInformation.workExperiences.forEach(record => updated[record._id] = record);
	}
	for (let workExperience of toPush) {
		const updatedRecord = await User.findOneAndUpdate(
			{
				email
			},
			{
				$push: {
					'workExperienceInformation.workExperiences': {
						...workExperience
					}
				}
			},
			{
				new: true,
				useFindAndModify: false,
				fields: {...workExperienceProjection},
				runValidators: true
			}
		);
		updatedRecord && updatedRecord.workExperienceInformation.workExperiences.forEach(record => updated[record._id] = record);
	}
	return Object.entries(updated).map(([, value]) => value);
};

exports.getWorkExperiences = email =>
	User.findOne(
		{
			email
		},
		{
			...workExperienceProjection
		}
	);


exports.getProjectInformation = email =>
	User.findOne(
		{
			email
		},
		{
			...projectsProjection
		}
	);

exports.updateProjectInformation = async (projects, email) => {
	const updated = {};
	const toPush = projects.filter(project => !project._id);
	const toUpdate = projects.filter(project => project._id);

	for (let project of toPush) {
		const updatedRecord = await User.findOneAndUpdate(
			{
				email
			},
			{
				$push: {
					'projectsInformation.projects': {
						...project
					}
				}
			},
			{
				new: true,
				useFindAndModify: false,
				runValidators: true,
				fields: {...projectsProjection}
			}
		);
		updatedRecord && updatedRecord.projectsInformation.projects.forEach(record => updated[record._id] = record)
	}
	for (let project of toUpdate) {
		const updatedRecord = await User.findOneAndUpdate(
			{
				email,
				'projectsInformation.projects._id': project._id
			},
			{
				$set: {
					'projectsInformation.projects.$.name': project.name,
					'projectsInformation.projects.$.startDate': project.startDate,
					'projectsInformation.projects.$.endDate': project.endDate,
					'projectsInformation.projects.$.isPresent': project.isPresent,
					'projectsInformation.projects.$.summary': project.summary,
					'projectsInformation.projects.$.link': project.link
				}
			},
			{
				new: true,
				useFindAndModify: false,
				fields: {
					...projectsProjection
				}
			}
		);
		updatedRecord && updatedRecord.projectsInformation.projects.forEach(record => updated[record._id] = record)
	}
	return Object.entries(updated).map(([, value]) => value);
};

exports.deleteProject = (projectId, email) =>
	User.findOneAndUpdate(
		{
			email
		},
		{
			$pull: {
				'projectsInformation.projects': {
					_id: projectId
				}
			}
		},
		{
			new: true,
			useFindAndModify: false,
			fields: {...projectsProjection}
		}
	);

exports.deleteWorkExperience = (workExperienceId, email) =>
	User.findOneAndUpdate(
		{
			email
		},
		{
			$pull: {
				'workExperienceInformation.workExperiences': {
					_id: workExperienceId
				}
			}
		},
		{
			new: true,
			useFindAndModify: false,
			fields: {...workExperienceProjection}
		}
	);

exports.deleteEducationInformation = (educationId, email) =>
	User.findOneAndUpdate(
		{
			email
		},
		{
			$pull: {
				'educationInformation.educations': {
					_id: educationId
				}
			}
		},
		{
			new: true,
			useFindAndModify: false,
			fields: {...educationInformationProjection}
		}
	);

exports.getCompleteInformation = async email => ({
	basicInformation: await this.getBasicInformation(email),
	educationInformation: await this.getEducationInformation(email),
	skillsInformation: await this.getSkillInformation(email),
	workExperienceInformation: await this.getWorkExperiences(email),
	projects: await this.getProjectInformation(email)
});