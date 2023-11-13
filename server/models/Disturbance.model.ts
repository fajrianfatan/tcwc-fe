import mongoose from "mongoose";

// disturbance schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
		distId: {
			type: String,
			required: true,
		},
        cycloneName: {
			type: String,
			required: true,
		},
        stormIdentifier: {
			type: String,
			required: true,
		},
        priority: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

// author model
export default mongoose.model("Disturbance", schema);
