const { create, find, findOne, update, deleteP } = require('../services/ProductServices');

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

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const removed = await deleteP({ id });

  if (removed) {
    return res.status(200).json(removed);
  }
  return res.status(422).json({
    err: { code: 'invalid_data', message: 'Wrong id format' },
  });
};

module.exports = {
  createProduct,
  findAll,
  findOneP,
  updateProductById,
  deleteProductById,
};
