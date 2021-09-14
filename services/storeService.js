const storeModel = require('../models/storeModel');

const createProduct = async ({ name, quantity }) => {
    const productExists = await storeModel.productExists(name);

    if (productExists) return { erro: 'Product already exists' };
    if (name.length < 5) {
        return { erro: '"name" length must be at least 5 characters long' }; 
    }

    if (quantity <= 0) return { erro: '"quantity" must be larger than or equal to 1' };
    if (typeof quantity !== 'number') return { erro: '"quantity" must be a number' };

    return storeModel.create({ name, quantity });
};

const updateProduct = async ({ id, name, quantity }) => {
    const productExists = await storeModel.productExists(name);
    
    if (productExists) return null;

    return storeModel.update({ id, name, quantity });
};

module.exports = { createProduct, updateProduct };