import mongoose from "mongoose";

export default mongoose.Schema(
	{
		type: {
			type: String,
			enum: ['secondary', 'seniorSecondary', 'graduation', 'postGraduation'],
		},
		instituteName:{
			type: String
		},
		university: {
			type: String
		},
		startDate: {
			type: Date
		},
		endDate: {
			type: Date
		},
		isPresent: {
			type: Boolean,
			default: false
		},
		course: {
			type: String
		},
		priority: {
			type: Number
		},
		score: {
			type: Number,
			min: 1,
			max: 100
		},
		isPercentage: {
			type: Boolean,
			default: true
		},
		isCGPA: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: {
			createdAt: 'createdAt',
			updatedAt: 'updatedAt'
		}
	}
);
