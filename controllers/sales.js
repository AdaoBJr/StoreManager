const { findAll } = require('./products');
const models = require('../models/sales');

const verify = async (itensSold) => {
    let pass = true;
    const products = await findAll();
    const IDList = products.map(({ _id }) => _id);
    itensSold.forEach(async ({ productId, quantity }) => {
        const found = () => {
            let find = false;
            for (let i = 0; i < IDList.length; i += 1) {
                if (`${IDList[i]}` === productId) find = true;
            }
            return find;
        };
        if (!found()) pass = false; 
    });
    itensSold.forEach(async ({ quantity }) => {
        if (quantity < 1) pass = false;
        if (typeof quantity === 'string') pass = false;
    });
    return pass;
};

const createSale = async (itensSold) => {
    const response = await verify(itensSold);
    if (response) return models.create(itensSold);
    return false;
};

module.exports = { createSale };