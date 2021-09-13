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
        const create = await salesModel.add(salesArray);
        return create;
    } 
        return anwaser;
};

// const updateValidation = async (id, name, quantity) => {
//     const anwaser = await validNameQuant(name, quantity);
//     if (anwaser === null) {
//         const update = await productModel.update(id, name, quantity);
//         return update;
//     }
//     return anwaser;
// };

// const deleteValidation = async (id) => {
//     const existId = await productModel.existId(id);

//     if (existId === null) {
//         return 'Wrong id format';
//     }
//     const update = await productModel.exclude(id);
//     return update;
// }; 

module.exports = { addValidation };