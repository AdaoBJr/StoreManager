const productService = require('../services/productsService');

const createNewProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const message = await productService.validateProduct(name, quantity);
  if (message) return res.status(422).json({ err: { code: 'invalid_data', message } });

  const newProduct = await productService.createNewProduct(name, quantity);
  return res.status(201).json(newProduct);
};

const getOneProduct = async (req, res, _next) => {
  const { id } = req.params;

  const errorMessage = await productService.validateId(id);
  if (errorMessage) return res.status(422).json(errorMessage); 
  
  const product = await productService.getProductById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product); 
};

const getAllProducts = async (_req, res, _next) => {
  const allProducts = await productService.getAllProducts();

  return res.status(200).json(allProducts);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const errorMessage = await productService.validateId(id);
  if (errorMessage) return res.status(422).json(errorMessage);

  const { name, quantity } = req.body;
  const message = await productService.validateProduct(name, quantity);
  if (message && message !== 'Product already exists') { 
    return res.status(422).json({ err: { code: 'invalid_data', message } }); 
  }

  // const haveProduct = await productService.getProductById(id);
  // if (!haveProduct) return res.status(422).json({ err: { code: 'invalid_data', message } });

  const updatedProduct = await productService.updateProduct(id, name, quantity);
  return res.status(200).json(updatedProduct);
};

const deleteProduct = async (req, res, _next) => {
  const { id } = req.params;
  const errorMessage = await productService.validateId(id);
  if (errorMessage) return res.status(422).json(errorMessage);

  const product = await productService.getProductById(id);
  const deleted = await productService.deleteProduct(id);

  if (deleted.errorMessage) return res.status(422).json(deleted.errorMessage);

  return res.status(200).json(product);
};

module.exports = {
  createNewProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct,
};
