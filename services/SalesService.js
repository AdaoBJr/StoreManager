const { ObjectId } = require('mongodb');
const salesModel = require('../models/SalesModel');

const validateQuantity = async (array) => {
    const quantitys = [];
    array.forEach((r) => quantitys.push(r.quantity));
    let result = '';
    quantitys.forEach((q) => {
        if (q <= 0) {
            result = {
                err: {
                    code: 'invalid_data',
                    message: 'Wrong product ID or invalid quantity' } };
        }
        if (typeof q === 'string') {
            result = {
                err: {
                    code: 'invalid_data',
                    message: 'Wrong product ID or invalid quantity' } };
        }
    });
    return result;
};

const addNewSale = async (array) => {
    const addSale = await salesModel.addNewSale(array);
    console.log(addSale);
    return addSale;
};

const getAllSales = async () => {
    const allSales = await salesModel.getAllSales();
    return allSales;
};

const getSaleById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return {
            err: {
                code: 'not_found',
                message: 'Sale not found',
            },
        };
    }
    const getSale = await salesModel.getSaleById(id);
    if (getSale === null) {
        return {
            err: {
                code: 'not_found',
                message: 'Sale not found',
            },
        };
    }
    return getSale;
};

module.exports = {
    validateQuantity,
    addNewSale,
    getAllSales,
    getSaleById,
};
