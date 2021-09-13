const model = require('../models/productsModel');
const productSchema = require('../schemas/ProductSchema');

const insertNewProduct = async (name, quantity) => {
  const validation = await productSchema.validate(name, quantity);
  if (validation.err) return validation;
  const insertedProduct = await model.insertNewProduct(name, quantity);
  return { status: 201, json: insertedProduct };
};

module.exports = {
  insertNewProduct,
};
