const mongoose = require('mongoose');

const ImageSchema = require('../../../schemas/image.schema');
const LocationSchema = require('../../../schemas/location.schema');
const SocialMediaLinksSchema = require('../../../schemas/socialMediaLinks.schema');
const EducationsSchema = require('../../../schemas/educations.schema');
const WorkExperienceSchema = require('../../../schemas/workExperience.schema');

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
}

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
	const updated = [];
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
		updated.push(updatedRecord);
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
		updated.push(updatedRecord);
	}
	return updated;
};

exports.getEducationInformation = email =>
	User.findOne(
		{
			email
		},
		{
			...educationInformationProjection
		}
	);

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
	const updated = [];

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
				fields: {...educationInformationProjection},
				useFindAndModify: false
			}
		);
		updated.push(updatedRecord);
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
		updated.push(updatedRecord);
	}
	return updated;
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
