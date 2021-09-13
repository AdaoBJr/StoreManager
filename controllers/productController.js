const validation = require('../services/validations');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, message, code } = await validation.validateCreate(name, quantity);
  if (message) {
    res.status(422).json({ err: { code, message } });
  }
  res.status(201).json({ _id, name, quantity });
};

module.exports = { createProduct };
