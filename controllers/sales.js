const { ObjectId } = require('mongodb');
const { findAll } = require('./products');
const models = require('../models/sales');

const idValid = (itensSold, products) => {
    let pass = true;
    const IDList = products.map(({ _id }) => _id);
    itensSold.forEach(async ({ productId }) => {
        const found = () => {
            let find = false;
            for (let i = 0; i < IDList.length; i += 1) {
                if (`${IDList[i]}` === productId) find = true;
            }
            return find;
        };
        pass = found(); 
    });
    return pass;
};

const verify = async (itensSold) => {
    let pass = true;
    const products = await findAll();
    pass = idValid(itensSold, products);
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

const findAllSales = () => models.findAll();

const findSales = (id) => {
    if (ObjectId.isValid(id)) {
        return models.findByID(id);
    }
    return null;
};

const updateSale = async (id, itensSold) => {
    const valid = await findSales(id);
    const verif = await verify(itensSold);
    if (valid && verif) {
        return models.update(id, itensSold);
    }
    return false;
};

const deleteSale = async (id, itensSold) => {
    const valid = await findSales(id);
    if (valid) return models.deleteSale(id, itensSold);
    return false;
};

module.exports = { createSale, findAllSales, findSales, updateSale, deleteSale };