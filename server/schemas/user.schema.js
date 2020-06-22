import mongoose from "mongoose";
import ImageSchema from "./image.schema";
import LocationSchema from "./location.schema";
import SocialMediaLinksSchema from "./socialMediaLinks.schema";
import EducationsSchema from "./educations.schema";
import WorkExperienceSchema from "./workExperience.schema";
import ProjectSchema from "./project.schema";
import TrainingSchema from './trainings.schema';

export default new mongoose.Schema(
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
		trainingInformation: {
			trainings: {
				type: [TrainingSchema]
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
