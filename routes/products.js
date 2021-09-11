const express = require('express');

const { verifyName,
        verifyExist,
        verifyQnt,
        createProduct,
        verifyNumber,
        findAll,
        findById,
        idValidate,
        editProduct
        } = require('../services/products');

const products = express.Router();

products.route('/')
    .get(
        findAll,
    )
    .post(
        verifyName,
        verifyExist,
        verifyNumber,
        verifyQnt,
        createProduct,
    );

products.route('/:id')
        .get(
            idValidate,
            findById,
        )
        .put(
            idValidate,
            verifyName,
            verifyNumber,
            verifyQnt,
            editProduct,
        );

module.exports = products;