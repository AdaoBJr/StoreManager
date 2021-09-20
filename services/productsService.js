const productModel = require('../models/productsModel');

const createProduct = async ({ name, quantity }) => 
    productModel.create({ name, quantity });

const getProductById = async (id) => productModel.productById(id);

const updateProduct = async ({ id, name, quantity }) => 
    productModel.update({ id, name, quantity });

const deleteProduct = async (id) => 
    productModel.exclude(id);

module.exports = { createProduct, getProductById, updateProduct, deleteProduct };
