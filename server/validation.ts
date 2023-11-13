import Joi from "joi";

// author validation
export const DisturbanceSchema = Joi.object({
	distId: Joi.string().min(6).required(),
	cycloneName: Joi.string().min(3).required(),
	stormIdentifier: Joi.string().min(3).required(),
	priority: Joi.number().min(3).required(),
});
