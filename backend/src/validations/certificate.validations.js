const joi = require("joi");

const createCertificateSchema = joi.object({
  certificate_name: joi.string().required(),
  certificate_description: joi.string().required(),
});

const updateCertificateSchema = joi.object({
  certificate_name: joi.string(),
  certificate_description: joi.string(),
});
