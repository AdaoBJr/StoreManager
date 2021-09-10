const salesModel = require('../model/salesModel');

const createSales = async (soldItens) => {
    const newSale = await salesModel.createSales(soldItens);
    return newSale;
};

const getAllSales = async () => {
    const allSales = await salesModel.getAllSales();
    return allSales;
};

const getSalesById = async (id) => {
    const sale = await salesModel.getSalesById(id);
    return sale;
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
};