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

module.exports = {
    validateQuantity,
    addNewSale,
};
