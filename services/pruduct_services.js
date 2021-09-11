const { newProducts, listAllProducts, listById } = require('../model/products_model');

const create = async (name, quantity) => {
    const newProduct = await newProducts(name, quantity);
    return newProduct; 
};

const getAll = async () => {
    const getProducts = await listAllProducts();
    return getProducts;
};

const getById = async (id) => {
    const getProduct = await listById(id);
    return getProduct;
};

module.exports = {
    create,
    getAll,
    getById,
};