const ModelProducts = require('../models/products');

const getAll = async () => {
  const allProducts = await ModelProducts.getAll();
  return { products: [...allProducts] };
};

const getById = async (id) => {
  const product = await ModelProducts.getById(id);
  return product;
};

const getByName = async (name) => {
  const product = await ModelProducts.getByName(name);
  return product;
};

const createProduct = async (name, quantity) => {
  const { insertedId } = await ModelProducts.createProduct(name, quantity);
  return insertedId;
};

const deleteById = async (id) => {
  const deletedProduct = await ModelProducts.getById(id)
    .then(() => ModelProducts.deleteById(id));
  return deletedProduct;
};

const editProduct = async (id, name, quantity) => {
  const editedProduct = await ModelProducts.editProduct(id, name, quantity).then(() => getById(id));
    return editedProduct;
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
  deleteById,
  editProduct,
};
