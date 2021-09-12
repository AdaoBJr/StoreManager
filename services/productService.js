const productModel = require('../models/productModel');

const addValidation = async (name, quantity) => {
    if (name.length < 5) {
        return '\'name\' length must be at least 5 characters long';
    }

    const existName = await productModel.exist(name);
    
    if (existName !== null) {
        return 'Product already';
    }

    if (quantity <= 0) {
        return '\'quatinty\' must be larger than or equal';
    }

    if (typeof (quantity) === 'string') {
        return '\'quatinty\' must be a number';
    }
    const create = await productModel.add(name, quantity);
    return create;
};

module.exports = { addValidation };