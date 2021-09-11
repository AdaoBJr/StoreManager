const { newProducts } = require('../model/products_model');

const create = async (name, quantity) => {
    const newProduct = await newProducts(name, quantity);
    return newProduct; 
};

module.exports = {
    create,
};