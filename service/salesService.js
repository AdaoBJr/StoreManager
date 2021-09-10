const salesModel = require('../model/salesModel');

const createSales = async (soldItens) => {
    const newSale = await salesModel.createSales(soldItens);
    return newSale;
};

module.exports = {
    createSales,
};