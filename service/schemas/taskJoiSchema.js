const Joi = require('joi');

const TIME_REGEX = /^([0-9]{2})\:([0-9]{2})$/;

const taskJoiSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().regex(TIME_REGEX).required(),
  end: Joi.string().regex(TIME_REGEX).required(),
  year: Joi.string().max(4).regex(/[0-9]/).required(),
  month: Joi.string()
    .max(2)
    .regex(/^([0-1]{1})([0-9]{1})$/)
    .required(),
  day: Joi.string()
    .max(2)
    .regex(/^([0-3]{1})([0-9]{1})$/)
    .required(),
  status: Joi.string().valid('toDo', 'inProgress', 'done'),
  priority: Joi.string().valid('low', 'medium', 'high'),
});

module.exports = taskJoiSchema;
