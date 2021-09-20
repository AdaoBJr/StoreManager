const productModel = require('../models/productsModel');

const createProduct = ({ name, quantity }) => productModel.create({ name, quantity });

const getProductById = (id) => productModel.productById(id);

const updateProduct = ({ id, name, quantity }) => productModel.update({ id, name, quantity });

const deleteProduct = (id) => productModel.exclude(id);

module.exports = { createProduct, getProductById, updateProduct, deleteProduct };
