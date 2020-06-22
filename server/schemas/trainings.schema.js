import mongoose from "mongoose";

export default mongoose.Schema(
	{
		name: {
			type: String
		},
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		summary: {
			type: String
		},
		link:{
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