const joi = require("joi");

const signUpSchema = joi.object({
  user_name: joi.string().trim().required().messages({
    "string.empty": "User name is required",
  }),
  email: joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
  }),
  password: joi
    .string()
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=<>?]).{8,14}$/, "password")
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one capital letter, one special character, and be between 8 and 14 characters in length",
    }),
});

const loginSchema = joi.object({
  email: joi.string().trim().email().required().messages({
    "string.empty": "Email is required",
  }),
  password: joi
    .string()
    .trim()
    .pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=<>?]).{8,14}$/, "password")
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one capital letter, one special character, and be between 8 and 14 characters in length",
    }),
});

module.exports = {
  signUpSchema,
  loginSchema,
};
