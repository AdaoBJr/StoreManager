const { create, find, findOne, update } = require('../services/ProductServices');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await create({ name, quantity });
  return res.status(201).json(product);
};

const findAll = async (req, res) => {
  const products = await find();
  return res.status(200).json({ products });
};

const findOneP = async (req, res) => {
  const { id } = req.params;
  const products = await findOne(id);

  if (products.status === 200) {
    return res.status(200).json(products.findOne);
  }

  return res.status(products.status).json(products.err);
};

const updateProductById = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  await update({ id, name, quantity });

  return res.status(200).json({ id, name, quantity });
};

module.exports = {
  createProduct,
  findAll,
  findOneP,
  updateProductById,
};
