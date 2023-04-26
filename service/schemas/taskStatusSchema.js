const Joi = require('joi');

const { CATEGORY } = require('../../constants/taskConstants');

const taskJoiStatusSchema = Joi.object({
  category: Joi.string()
    .valid(...Object.values(CATEGORY))
    .required(), // ["toDo","inProgress","done"]
});

module.exports = taskJoiStatusSchema;
