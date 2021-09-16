// const express = require('express');
// const router = express.Router();
const { validateIfAlreadyExistsAndLength,
    validateQuantity,
    addProduct,
    getAllProducts,
    getProductById,
    validateIfIdAlreadyExists } = require('../services/ProductsService');

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
    const allProducts = await getAllProducts();
    return res.status(200).json({ products: allProducts });
};

const getProductId = async (req, res) => {
    const { id } = req.params;
    if (await validateIfIdAlreadyExists(id)) {
        const error = await validateIfIdAlreadyExists(id);
        return res.status(422).json(error);
    }
    const product = await getProductById(id);
    return res.status(200).json(product);
};

module.exports = {
    addNewProduct,
    getProducts,
    getProductId,
};
