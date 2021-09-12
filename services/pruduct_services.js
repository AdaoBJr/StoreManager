const { newProducts, listAllProducts,
    listById, updateById, deleteById } = require('../model/products_model');

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
    const updateProduct = await updateById(id, name, quantity);
   
    return updateProduct;
};

const remove = async (id) => {
    const product = await deleteById(id);
    return product;
};

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    update,
    remove,
};