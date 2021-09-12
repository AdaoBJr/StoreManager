const status = require('http-status');
const productModel = require('../models/productModel');
const productService = require('../services/productService');
const errorGeneral = require('../middlewares/errorGeneral');

const getAllProducts = async (_req, res) => {
    const products = await productModel.getAll();
    return res.status(status.OK).json({ products });
};

const getIdProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getId(id);
        return res.status(status.OK).json(product);
    } catch (error) {
        const msg = 'Wrong id format';
        return res.status(status.UNPROCESSABLE_ENTITY).json(errorGeneral.error(msg));
    }
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const createMSG = await productService.addValidation(name, quantity);

    if (typeof (createMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errorGeneral.error(createMSG));
    } 
        return res.status(status.CREATED).json(createMSG);
};

module.exports = { getAllProducts, createProduct, getIdProduct };