const model = require('../models/productsModel');
const productSchema = require('../schemas/ProductSchema');

const insertNewProduct = async (name, quantity) => {
  const validation = await productSchema.validateNameAndQty(name, quantity);
  if (validation.err) return validation;
  const insertedProduct = await model.insertNewProduct(name, quantity);
  return { status: 201, json: insertedProduct };
};

const getAllProducts = async () => {
  const productData = await model.findAllProducts();
  return productData;
};

const getProductById = async (id) => {
  const validation = await productSchema.validateId(id);
  if (validation.err) return validation;
  const productWanted = await model.findById(id);
  console.log('service', productWanted);
  if (productWanted) return productWanted;
};

module.exports = {
  insertNewProduct,
  getAllProducts,
  getProductById,
};
