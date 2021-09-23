// const express = require('express');
// const router = express.Router();
const { validateIfAlreadyExistsAndLength,
    validateQuantity,
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    validateString,
} = require('../services/ProductsService');

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
    // const error = await validateIfIdAlreadyExists(id);
    const product = await getProductById(id);
    if (product.err) {
        return res.status(422).json(product);
    }
    return res.status(200).json(product);
};

const productUpdate = async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    if (await validateString(name)) {
        const data = await validateString(name);
        return res.status(422).json(data);
    }

    if (await validateQuantity(quantity)) {
        const data = await validateQuantity(quantity);
        return res.status(422).json(data);
    }
    const update = await updateProduct(id, name, quantity);
    console.log(update);
    if (update) {
        // return res.status(422).json(update);
        return res.status(200).json(update);
    }
};

const productDelete = async (req, res) => {
    const { id } = req.params;
    const productDeleted = await deleteProduct(id);
    // console.log(productDeleted);
    if (productDeleted.err) {
        return res.status(422).json(productDeleted);
    }
    return res.status(200).json(productDeleted);
};

module.exports = {
    addNewProduct,
    getProducts,
    getProductId,
    productUpdate,
    productDelete,
};
