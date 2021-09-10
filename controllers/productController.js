const { create } = require('combined-stream');

const createproduct = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await create({ name, quantity });
  return res.status(201).json(product);
};

module.exports = { createproduct };
