const validation = require('../services/validations');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, message, code } = await validation.validateCreate(name, quantity);
  if (message) {
    return res.status(422).json({ err: { code, message } });
  }
  return res.status(201).json({ _id, name, quantity });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const update = await validation.validateUpdate({ id, name, quantity });
  const { _id, message, code } = update;
  if (message) {
    res.status(422).json({ err: { code, message } });
  }
  res.status(200).json({ _id, name, quantity });
};

const findAllProducts = async (_req, res) => {
    const listProducts = await validation.validateFindAll();
    return res.status(200).json({ products: listProducts });
  };

const findProductById = async (req, res) => {
  const { id } = req.params;
  const showProductById = await validation.validateFindById(id);
  const { code, message } = showProductById;
  if (message) {
    return res.status(422).json({ err: { code, message } });
  }
  return res.status(200).json(showProductById);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productToBeDeleted = await validation.validateDelete(id);
  const { code, message } = productToBeDeleted;
  if (message) {
    res.status(422).json({ err: { code, message } });
  }
  return res.status(200).json(productToBeDeleted);
};

module.exports = {
  createProduct,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
