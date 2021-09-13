const productModel = require('../models/productModel');

const validNameQuant = async (name, quantity) => {
    if (name.length < 5) {
        return '"name" length must be at least 5 characters long';
    }

    if (quantity <= 0) {
        return '"quantity" must be larger than or equal to 1';
    }

    if (typeof (quantity) === 'string') {
        return '"quantity" must be a number';
    }

    return null;
};

const addValidation = async (name, quantity) => {
    const anwaser = await validNameQuant(name, quantity);

    const existName = await productModel.existName(name);
    
    if (existName !== null) {
        return 'Product already exists';
    }
    if (anwaser === null) {
        const create = await productModel.add(name, quantity);
        return create;
    } 
        return anwaser;
};

const updateValidation = async (id, name, quantity) => {
    const anwaser = await validNameQuant(name, quantity);
    if (anwaser === null) {
        const update = await productModel.update(id, name, quantity);
        return update;
    }
    return anwaser;
};

const deleteValidation = async (id) => {
    const existId = await productModel.existId(id);

    if (existId === null) {
        return 'Wrong id format';
    }
    const update = await productModel.exclude(id);
    return update;
}; 

module.exports = { addValidation, updateValidation, deleteValidation };