const { newProduct } = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
    const newProducts = await newProduct({ name, quantity });
    return newProducts;
};

module.exports = { createProduct };
