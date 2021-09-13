const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');

const validQuant = async (quantity) => {
    if (quantity <= 0 || typeof (quantity) === 'string') {
        return 'Wrong product ID or invalid quantity';
    }

    return null;
};

const addValidation = async (salesArray) => {
    const salesObject = salesArray[0];

    const anwaser = await validQuant(salesObject.quantity);

    const existId = await productModel.existId(salesObject.productId);
    
    if (existId === null) {
        return 'Wrong product ID or invalid quantity';
    }
    if (anwaser === null) {
        // console.log('aqui1');
        await productModel.updateWithSale(salesObject.productId, salesObject.quantity);
        const create = await salesModel.add(salesArray);
        return create;
    } 
        return anwaser;
};

const updateValidation = async (id, salesArray) => {
    // console.log(salesArray);
    const salesObject = salesArray[0];

    const anwaser = await validQuant(salesObject.quantity);
    if (anwaser === null) {
        const update = await salesModel.update(id, salesArray);
        return update;
    }
    return anwaser;
};

const deleteValidation = async (id) => {
    const existId = await salesModel.existId(id);

    if (existId === null) {
        return 'Wrong sale ID format';
    }
    const { itensSold } = await salesModel.getId(id);
    const object = itensSold[0];
    await productModel.updateWithSale(object.productId, object.quantity);
    const deleteOne = await salesModel.exclude(id);
    return deleteOne;
}; 

module.exports = { addValidation, updateValidation, deleteValidation };