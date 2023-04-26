const Joi = require('joi').extend(require('@joi/date'));

const { PRIORITY, CATEGORY } = require('../../constants/taskConstants');

const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const taskJoiSchema = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string().regex(TIME_REGEX).required(),
  end: Joi.string().regex(TIME_REGEX).required(),
  date: Joi.date().format('YYYY-MM-DD').required(),
  priority: Joi.string()
    .valid(...Object.values(PRIORITY)) // ["low","medium","high"]
    .required(),
  category: Joi.string().valid(...Object.values(CATEGORY)), // ["toDo","inProgress","done"]
});

const taskJoiStatusSchema = Joi.object({
  category: Joi.string()
    .valid(...Object.values(CATEGORY))
    .required(), // ["toDo","inProgress","done"]
});

module.exports = taskJoiSchema;
