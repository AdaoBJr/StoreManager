const status = require('http-status');
const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');
const errorGeneral = require('../middlewares/errorGeneral');

const getAllSales = async (_req, res) => {
    const sales = await salesModel.getAll();
    return res.status(status.OK).json({ sales });
};

const getIdSale = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await salesModel.getId(id);
        return res.status(status.OK).json(sale);
    } catch (error) {
        const msg = 'Sale not found';
        return res.status(status.UNPROCESSABLE_ENTITY).json(errorGeneral.error(msg));
    }
};

const createSales = async (req, res) => {
    const salesObject = req.body;
    const createMSG = await salesService.addValidation(salesObject);

    if (typeof (createMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errorGeneral.error(createMSG));
    } 
        return res.status(status.OK).json(createMSG);
};

const updateSale = async (req, res) => {
    const { id } = req.params;
    const array = req.body;
    const createMSG = await salesService.updateValidation(id, array);

    if (typeof (createMSG) === 'string') {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errorGeneral.error(createMSG));
    } 
        return res.status(status.OK).json(createMSG);
};

// const deleteProduct = async (req, res) => {
//     const { id } = req.params;
//     const createMSG = await productService.deleteValidation(id);

//     if (typeof (createMSG) === 'string') {
//         return res.status(status.UNPROCESSABLE_ENTITY).json(errorGeneral.error(createMSG));
//     } 
//         return res.status(status.OK).json(createMSG);
// };

module.exports = { createSales, getIdSale, getAllSales, updateSale };