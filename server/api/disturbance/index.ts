import DisturbanceModel from "~~/server/models/Disturbance.model";

export default defineEventHandler(async (event) => {
	// return all authors
	return await DisturbanceModel.find();
});
