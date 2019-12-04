const mongoose = require('mongoose');

module.exports = mongoose.Schema(
	{
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