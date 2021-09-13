const service = require('../services/productsService');

const insertNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await service.insertNewProduct(name, quantity);
  const { err } = result;
  if (result.err) return res.status(result.status).json({ err });
  const productInserted = result.json;
  res.status(result.status).json(productInserted);
};

const getAllProducts = async (_req, res) => {
  const result = await service.getAllProducts();
  // console.log(result);
  res.status(200).json({ products: result });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getProductById(id);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json({ err });
  } 
  res.status(200).json(result);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await service.updateProductById(id, name, quantity);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json({ err });
  }
  res.status(200).json(result);
};

const deleteProductById = async (req, res) => {
  const { id } = req.params;
  const result = await service.deleteProductById(id);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json({ err });
  } 
  res.status(200).json(result);
};

module.exports = {
  insertNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
