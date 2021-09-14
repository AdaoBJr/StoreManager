const productModel = require('../models/productModel');

// const validationName = async ({ name }) => {
//     const productExists = await storeModel.productExists(name);

//     if (productExists) return { erro: 'Product already exists' };
//     if (name.length < 5) {
//         return { erro: '"name" length must be at least 5 characters long' }; 
//     }

//     return 'validated';
// };

// const validationQuantity = async ({ quantity }) => {
//     if (quantity <= 0) return { erro: '"quantity" must be larger than or equal to 1' };
//     if (typeof quantity !== 'number') return { erro: '"quantity" must be a number' };

//     return 'validated';
// };

// const createProduct = async ({ name, quantity }) => {
//     const validateName = await validationName(name);
//     const validateQuantity = await validationQuantity(quantity);
    
//     if (validateName === 'validated' && validateQuantity === 'validated') {
//         return storeModel.create({ name, quantity }); 
// }
// };

const createProduct = async ({ name, quantity }) => {
    const productExists = await productModel.productExists(name);

    if (productExists) return { erro: 'Product already exists' };
    if (name.length < 5) {
        return { erro: '"name" length must be at least 5 characters long' }; 
    }

    if (quantity <= 0) return { erro: '"quantity" must be larger than or equal to 1' };
    if (typeof quantity !== 'number') return { erro: '"quantity" must be a number' };

    return productModel.create({ name, quantity });
};

const updateProduct = async ({ id, name, quantity }) => {
    if (name.length < 5) {
        return { erro: '"name" length must be at least 5 characters long' }; 
    }

    if (quantity <= 0) return { erro: '"quantity" must be larger than or equal to 1' };
    if (typeof quantity !== 'number') return { erro: '"quantity" must be a number' };

    return productModel.update({ id, name, quantity });
};

const exclude = async (id) => {
    const product = await productModel.productIdExists(id);
    if (!product) return null;

    const { name, quantity, _id } = product;
    await productModel.exclude(id);
    return { name, quantity, _id };
};

module.exports = { createProduct, updateProduct, exclude };