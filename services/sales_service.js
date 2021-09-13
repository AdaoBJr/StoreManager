const { listSales, listById, createSales, updateById } = require('../model/sales_model');

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

const update = async (id, productId, quantity) => {
    const updateProduct = await updateById(id, productId, quantity);
   
    return updateProduct;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
};