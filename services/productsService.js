const model = require('../models/productsModel');
const productSchema = require('../schemas/ProductSchema');

const insertNewProduct = (name, quantity) => {
  const validation = productSchema.validate(name, quantity);
  if (validation.err) return validation;
  const insertedProduct = model.insertNewProduct(name, quantity);
  return { status: 201, json: insertedProduct };
};

module.exports = {
  insertNewProduct,
};
