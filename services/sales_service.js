const { listSales, listById, createSales, updateById,
    deleteById } = require('../model/sales_model');

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
    console.log(sale, 'service');

    if (!sale) return { error: { code: 'NOT_FOUND', message: 'Sale not found' } };

    return sale;
};

const update = async (id, productId, quantity) => {
    const updateProduct = await updateById(id, productId, quantity);
   
    return updateProduct;
};

const remove = async (id) => {
    const product = await deleteById(id);
    return product;
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    remove,
};