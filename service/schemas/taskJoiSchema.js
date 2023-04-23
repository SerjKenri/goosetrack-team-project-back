const Joi = require('joi');

const taskJoiSchema = Joi.object({
  title: Joi.string().required(),
  start: Joi.string().required(),
  end: Joi.string().required(),
  year: Joi.string().required(),
  month: Joi.string().required(),
  status: Joi.string().valid('toDo', 'inProgress', 'done'),
  priority: Joi.string().valid('low', 'medium', 'high'),
});

module.exports = taskJoiSchema;
