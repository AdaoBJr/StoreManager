const { getAllProducts } = require('./product');
const { create } = require('./productCreate');
const { getProductsId } = require('./product');
const { productId } = require('./product');
const { updateProducts } = require('./product');
const { deleteProductsId } = require('./product');

module.exports = {
    getAllProducts,
    create,
    getProductsId,
    productId,
    updateProducts,
    deleteProductsId,
};
