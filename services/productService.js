const { add, productExists, productExistsbyId, 
  exclude, getOne } = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  const product = await productExists(name);

    if (product) return null;

  return add({ name, quantity });
};

const readProduct = async (id) => {
  const product = await getOne(id);
    if (!product) return null;
    
  return product;
};

const deleteProduct = async (id) => {
  const product = await productExistsbyId(id);

    if (product) return null;

  return exclude(id);
};

module.exports = {
  createProduct,
  readProduct,
  deleteProduct,
};