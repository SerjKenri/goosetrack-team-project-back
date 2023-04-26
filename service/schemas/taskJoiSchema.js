const Joi = require('joi').extend(require('@joi/date'));

const { PRIORITY, CATEGORY } = require('../../constants/taskConstants');

const TIME_REGEX = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const taskJoiSchema = Joi.object({
  title: Joi.string().max(250),
  start: Joi.string().regex(TIME_REGEX),
  end: Joi.string().regex(TIME_REGEX),
  date: Joi.date().format('YYYY-MM-DD'),
  priority: Joi.string().valid(...Object.values(PRIORITY)), // ["low","medium","high"]
  category: Joi.string().valid(...Object.values(CATEGORY)), // ["toDo","inProgress","done"]
});

module.exports = taskJoiSchema;
