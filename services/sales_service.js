const { listSales, listById, createSales } = require('../model/sales_model');

const create = async (itensSold) => {
    const newSale = await createSales(itensSold);
    return newSale; 
};

const getAll = async () => {
    const sales = await listSales();
    return sales;
};

const getById = async (id) => {
    const sale = await listById(id);
    return sale;
};

module.exports = {
    create,
    getAll,
    getById,
};