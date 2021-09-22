const {
  newProduct, findProduct, findOneProduct, updateProduct,
} = require('../models/ProductsModel');

const create = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const find = async () => {
  const findProducts = await findProduct();
  return findProducts;
};

const findOne = async (id) => {
  const findProducts = await findOneProduct(id);
  return findProducts;
};

const update = async ({ id, name, quantity }) => {
  const updateProductService = await updateProduct({ id, name, quantity });
  return updateProductService;
};

module.exports = {
  create,
  find,
  findOne,
  update,
};
