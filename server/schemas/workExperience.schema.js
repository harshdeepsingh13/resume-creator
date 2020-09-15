import mongoose from "mongoose";

export default mongoose.Schema(
	{
		user:{
			type: String,
			required: true,
			index: true
		},
		company: {
			type: String
		},
		position: {
			type: String
		},
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		isPresent: {
			type: Boolean
		},
		responsibilities: {
			type: String
		},
		location: {
			type: String
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);
