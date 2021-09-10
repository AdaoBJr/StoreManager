const productsModel = require('../model/productsModel');

const createProduct = async ({ name, quantity }) => {
    const newProduct = await productsModel.createProduct({ name, quantity });
    return newProduct;
};

const getAllProducts = async () => {
    const allProducts = await productsModel.getAllProducts();
    return allProducts;
};

module.exports = {
    createProduct,
    getAllProducts,
};