const mongoose = require('mongoose');

const ImageSchema = require('../../../schemas/image.schema');
const LocationSchema = require('../../../schemas/location.schema');
const SocialMediaLinksSchema = require('../../../schemas/socialMediaLinks.schema');
const EducationsSchema = require('../../../schemas/educations.schema')

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