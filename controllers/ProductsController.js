// const express = require('express');
// const router = express.Router();
const { validateIfAlreadyExistsAndLength,
    validateQuantity, addProduct } = require('../services/ProductsService');

const addNewProduct = async (req, res) => {
    const { name, quantity } = req.body;

    if (await validateIfAlreadyExistsAndLength(name)) {
        const data = await validateIfAlreadyExistsAndLength(name);
        return res.status(422).json(data);
    }

    if (await validateQuantity(quantity)) {
        const data = await validateQuantity(quantity);
        return res.status(422).json(data);
    }

    const result = await addProduct(name, quantity);
    console.log(result);
    return res.status(201).json(result);
};

module.exports = {
    addNewProduct
    ,
};
