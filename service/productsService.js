const productsModel = require('../model/productsModel');

const createProduct = async ({ name, quantity }) => {
    const newProduct = await productsModel.createProduct({ name, quantity });
    return newProduct;
};

const getAllProducts = async () => {
    const allProducts = await productsModel.getAllProducts();
    return allProducts;
};

const getProductById = async (id) => {
    const product = await productsModel.getProductById(id);
    return product;
};

const updateProduct = async ({ name, quantity, id }) => {
    const updatedProduct = await productsModel.updateProduct({ name, quantity, id });
    return updatedProduct;
};

const deleteProductById = async (id) => {
    const deletedProduct = await productsModel.deleteProductById(id);
    return deletedProduct;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
};