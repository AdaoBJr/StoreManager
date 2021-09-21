const { ObjectId } = require('mongodb');
const salesModel = require('../models/SalesModel');

const errorInvalideID = {
    err: {
        code: 'not_found',
        message: 'Sale not found',
    },
};

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
        return errorInvalideID;
    }
    const getSale = await salesModel.getSaleById(id);
    if (getSale === null) {
        return errorInvalideID;
    }
    return getSale;
};

const updateSale = async (id, array) => {
    if (!ObjectId.isValid(id)) {
        return errorInvalideID;
    }
    const saleUpdated = await salesModel.updateSale(id, array);
    if (saleUpdated) {
        return {
            _id: id,
            itensSold: array,
        };
    }
};

const deleteSale = async (id) => {
    if (!ObjectId.isValid(id)) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong sale ID format' },
            };
    }
    const saleDeleted = await salesModel.deleteSale(id);
    if (saleDeleted === null) {
        return {
            err: {
                code: 'invalid_data',
                message: 'Wrong product ID or invalid quantity' },
            };
    }
    return saleDeleted;
};

module.exports = {
    validateQuantity,
    addNewSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
};
