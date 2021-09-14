const { getAllProducts } = require('./product');
const { create } = require('./createProducs');
const { getProductsId } = require('./product');
const { productId } = require('./product');
const { updateProducts } = require('./product');
const { deleteProductsId } = require('./product');
const { createSales } = require('./createSales');

module.exports = {
    getAllProducts,
    create,
    getProductsId,
    productId,
    updateProducts,
    deleteProductsId,
    createSales,
};
