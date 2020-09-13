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
		isPresent: {
			type: Boolean
		},
		summary: {
			type: String
		},
		link: {
			type: String
		},
		technologyStack: {
			type: Array
		},
		website: {
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
