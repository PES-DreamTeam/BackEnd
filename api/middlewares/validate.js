const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const util = require('util');

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  if (error) {
    const errors = [];
    error.details.map((details) => {
      errors.push({
        attribute: details.message.includes("password") ? "password" : "email",
        errorMessage: details.message
      })
    })
    return next(res.status(403).send({errors}));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;