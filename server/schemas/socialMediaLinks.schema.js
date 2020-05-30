import mongoose from "mongoose";

export default mongoose.Schema(
	{
		github: {
			type: String
		},
		linkedin: {
			type: String
		},
		facebook: {
			type: String
		},
		instagram: {
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
