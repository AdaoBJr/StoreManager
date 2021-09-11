const express = require('express');

const { verifyName,
        verifyExist,
        verifyQnt,
        createProduct,
        verifyNumber,
        } = require('../services/products');

const products = express.Router();

products.route('/')
    .post(
        verifyName,
        verifyExist,
        verifyNumber,
        verifyQnt,
        createProduct,
    );

module.exports = products;