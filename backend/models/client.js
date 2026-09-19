const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		company_name: { type: String, required: true },
		email: { type: String, required: true },
		phone: String,
		status: {
			type: String,
			enum: ["Lead", "New", "Onboarding", "Active", "On Hold", "Completed", "Inactive"],
			default: "New",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
