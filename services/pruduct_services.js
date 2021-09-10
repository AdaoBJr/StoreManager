const { newProducts } = require('../model/products_model');

const create = async (name, quantity) => {
    const newProduct = await newProducts(name, quantity);
    console.log(name, quantity, 'Dentro do service');
    return newProduct; 
};

module.exports = {
    create,
};