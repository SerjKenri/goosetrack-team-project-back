const validation = schema => {
  return (req, res, next) => {
    const { title, start, end, date, priority, category, columnId, position } = req.body
    const toValidate = { title, start, end, date, priority, category, columnId, position }
    const { error } = schema.validate(toValidate);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  };
};

module.exports = validation;
