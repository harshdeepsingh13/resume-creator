import mongoose from "mongoose";

export default mongoose.Schema(
	{
		uploadId: {
			type: String,
			required: true,
			default: "defaultAvatar.png"
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);
