import DisturbanceModel from "~~/server/models/Disturbance.model";
import { DisturbanceSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = DisturbanceSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Disturbance
	try {
		await DisturbanceModel.create(body);
		return { message: "Disturbance created" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
