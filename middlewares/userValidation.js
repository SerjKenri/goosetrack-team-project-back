const Joi = require('joi');

const patchUpdateUserValidation = (req, res, next) => {
  //   const schema = Joi.object({
  //     email: Joi.string()
  //       .email({
  //         minDomainSegments: 2,
  //       })
  //       .required(),
  //     password: Joi.string().regex(PASSWD_REGEX).required(),
  //   });

  //   const valodationResult = schema.validate(req.body);

  //   if (valodationResult.error) {
  //     const msg = valodationResult.error.details[0].message;
  //     return res.status(400).json({ message: msg });
  //     // return res.status(400).json({ message: "Invalid user email or password" });
  //   }

  next();
};

module.exports = {
  patchUpdateUserValidation,
};
