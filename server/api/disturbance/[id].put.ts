import DisturbanceModel from "~~/server/models/Disturbance.model";
import { DisturbanceSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = DisturbanceSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update Disturbance
	try {
		await DisturbanceModel.findByIdAndUpdate(id, body);
		return { message: "Disturbance updated" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
