const productService = require('../services/productService');

const ok = 200;
const created = 201;
const unprocessableEntity = 422;

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, message, code } = await productService.createProductValidation(name, quantity);
  
  if (message) {
    return res.status(unprocessableEntity).json({ err: { message, code } });
  }
  return res.status(created).json({ _id, name, quantity });
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  const productById = await productService.findProductByIdValidation(id);
  const { code, message } = productById;
  if (message) {
    return res.status(422).json({ err: { code, message } });
  }
  return res.status(200).json(productById);
};

const findAllProducts = async (_req, res) => {
  const productsList = await productService.findAllProductsValidation();
  return res.status(ok).json({ products: productsList });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdate = await productService.updateProductValidation({ id, name, quantity });
  const { _id, message, code } = productUpdate;
  if (message) {
    res.status(unprocessableEntity).json({ err: { code, message } });
  }
  res.status(ok).json({ _id, name, quantity });
};

module.exports = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
};
