const { newProduct, updateProduct, productsList, listById } = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
    const newProducts = await newProduct({ name, quantity });
    return newProducts;
};

const getAll = async () => {
    const products = await productsList();
    return products;
};
  
const getById = async (id) => {
    const product = await listById(id);
    return product;
};

const update = async ({ id, name, quantity }) => {
    const productUpdate = await updateProduct({ id, name, quantity });
    return productUpdate;
  };

module.exports = { createProduct, getAll, getById, update };
