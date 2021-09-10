const { newProduct, listProducts, listById,
  updateProduct, deleteProduct } = require('../models/produtos.model');
const { productExists } = require('../middlewares/produtos.middlewares');

const criar = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

const remove = async ({ id }) => {
  const product = await productExists({ id });

  if (!product) {
    return product;
  }
  const { name, quantity, _id } = product;
  await deleteProduct({ id });
  return { name, quantity, _id };
};

const getAll = async () => {
  const products = await listProducts();
  return products;
};

const getById = async (id) => {
  const product = await listById(id);
  return product;
};

const update = async ({ id, name, quantity }) => {
  const updateProducts = await updateProduct({ id, name, quantity });
  return updateProducts;
};

module.exports = { criar, getAll, getById, update, remove };
