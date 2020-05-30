import mongoose from "mongoose";

export default mongoose.Schema(
	{
		state: {
			type: String
		},
		country: {
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
