const Joi = require("joi");
const { ValidateMessages } = require("../utils");

const subscriptionTypes = ["starter", "pro", "business"];

const authSchema = Joi.object({
  email: Joi.string().required().messages(ValidateMessages("email")),
  password: Joi.string()
    .required()
    .messages(ValidateMessages("password"))
    .min(6),
});

const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .equal(...subscriptionTypes)
    .required()
    .messages(ValidateMessages("subscription")),
});

module.exports = { authSchema, updateSubscriptionSchema };
