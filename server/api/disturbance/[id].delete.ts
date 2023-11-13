import DisturbanceModel from "~~/server/models/Disturbance.model";
import { DisturbanceSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove Disturbance
	try {
		await DisturbanceModel.findByIdAndDelete(id);
		return { message: "Disturbance removed" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
