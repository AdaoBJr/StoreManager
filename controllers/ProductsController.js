// const express = require('express');
// const router = express.Router();
const { validateIfAlreadyExistsAndLength,
    validateQuantity,
    addProduct,
    getAllProducts,
    getProductById } = require('../services/ProductsService');

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
    return res.status(201).json(result);
};

const getProducts = async (req, res) => {
    const products = await getAllProducts();
    return res.status(200).json(products);
};

const getProductId = async (req, res) => {
    const { id } = req.params;
    const productOrError = await getProductById(id);
    if (productOrError.err) {
        return res.status(422).json(productOrError);
    }
    return res.status(200).json(productOrError);
};

module.exports = {
    addNewProduct,
    getProducts,
    getProductId,
};
