const { newProduct, allProducts, productById,
  updatedProduct, deleteProduct } = require('../models/productModel');

const { productExist } = require('../middlewares/productMiddlewares');

const create = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const getAll = async () => {
  const products = await allProducts();
  return products;
};

const getById = async (id) => {
  const product = await productById(id);
  return product;
};

const update = async ({ id, name, quantity }) => {
  const product = await updatedProduct({ id, name, quantity });
  return product;
};

const remove = async ({ id }) => {
  const product = await productExist({ id });

  if (!product) {
    return product;
  }
  const { name, quantity, _id } = product;
  await deleteProduct({ id });
  return { name, quantity, _id };
};

module.exports = { create, getAll, getById, update, remove };
