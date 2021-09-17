// req res
const model = require('./models/productModels');

const create = async (_req, res) => {
  const product = await model.getAll();

  return res.status(200).json(product);
};

module.exports = {
  create,
};
