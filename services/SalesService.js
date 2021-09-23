const { ObjectId } = require('mongodb');
const salesModel = require('../models/SalesModel');
const productsModel = require('../models/ProductsModel');

const errorInvalideID = {
    err: {
        code: 'not_found',
        message: 'Sale not found',
    },
};

// const errorStock = {
//     err: {
//         code: 'stock_problem',
//         message: 'Such amount is not permitted to sell',
//     },
// };

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

// const verifyStockBeforeSell = async (array) => {
//     const list = [];
//     await array.itensSold.forEach((item) => list.push(item));
//     let getResult = '';
//     list.forEach(async (sale) => {
//         getResult = await productsModel.validateStockBeforeSell(sale);
//     });
//     console.log(getResult);
//     if (!getResult) {
//         return {
//             err: {
//                 code: 'stock_problem',
//                 message: 'Such amount is not permitted to sell' } };
//     }
// };

// const verifica = async (obj) => {
//     const getResult = await productsModel.validateStockBeforeSell(obj);
//     console.log(getResult);
//     return getResult;
// };

// const verifyStockBeforeSell = async (array) => {
//     // const list = array;
//     console.log(array);
//     const getResult = array
//     .map(async (sale) => { await productsModel.validateStockBeforeSell(sale); });
//     return Promise.all(getResult);
//     // console.log(getResult);
//     // return getResult;
// };

const addNewSale = async (array) => {
    // console.log(array);
    // const list = [];
    // await array.itensSold.forEach((item) => list.push(item));
    // // console.log(list);
    // const result = await verifyStockBeforeSell(list);
    // for (let i = 0; i < result.length; i += 1) {
    //     if (result[i] === false) {
    //         return errorStock;
    //     }
    // }
       
    // if (result === false) return errorStock;
    const addSale = await salesModel.addNewSale(array);
    const getQuantity = [];
    [addSale].forEach((sale) => sale.itensSold.forEach((s) => getQuantity.push(s)));
    await getQuantity.forEach((sale) => productsModel.updateQuantityBeforeDeleteSale(sale));
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

const updateQuantityAfterDeleteSale = (objeto) => {
    const getQuantity = [];
    [objeto].forEach((sale) => sale.itensSold.forEach((s) => getQuantity.push(s)));
    getQuantity.forEach((sale) => productsModel.updateQuantityAfterDeleteSale(sale));
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
    await updateQuantityAfterDeleteSale(saleDeleted);
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
