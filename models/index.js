const { getAllProducts } = require('./product');
const { create } = require('./createProducs');
const { getProductsId } = require('./product');
const { productId } = require('./product');
const { updateProducts } = require('./product');
const { deleteProductsId } = require('./product');
const { createSales } = require('./createSales');
const { salesId } = require('./sales');
const { getAllSales } = require('./sales');

module.exports = {
    getAllProducts,
    create,
    getProductsId,
    productId,
    updateProducts,
    deleteProductsId,
    createSales,
    salesId,
    getAllSales,
};
