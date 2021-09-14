const { getAllProducts } = require('./product');
const { create } = require('./products');
const { getProductsId } = require('./product');
const { productId } = require('./product');
const { updateProducts } = require('./product');

module.exports = {
    getAllProducts,
    create,
    getProductsId,
    productId,
    updateProducts,
};
