import mongoose from "mongoose";
import ImageSchema from "./image.schema";
import LocationSchema from "./location.schema";
import SocialMediaLinksSchema from "./socialMediaLinks.schema";

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
		skills: {
			type: Array
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);
