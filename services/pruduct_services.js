const { newProducts, listAllProducts, listById, updateById } = require('../model/products_model');

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

const update = async (id, name, quantity) => {
    console.log(id, name, quantity, 'service');
    const updateProduct = await updateById(id, name, quantity);
    console.log(id, name, quantity, 'service2');
    return updateProduct;
};

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    update,
};