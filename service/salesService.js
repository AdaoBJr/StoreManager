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

const updateSale = async ({ id, itensSold }) => {
    const updatedSale = await salesModel.updateSales({ id, itensSold });
    return updatedSale;
};

const deleteSalesById = async (id) => {
    const deletedSale = await salesModel.deleteSaleById(id);
    return deletedSale;
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
    updateSale,
    deleteSalesById,
};