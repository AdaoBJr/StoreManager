const salesService = require('../services/SalesService');

const addNewSale = async (req, res) => {
    const array = req.body;
    const validQuantity = await salesService.validateQuantity(array);
    if (validQuantity) {
        return res.status(422).json(validQuantity);
    }
    const addSales = await salesService.addNewSale({ itensSold: array });
    res.status(200).json(addSales);
};

const getAllSales = async (req, res) => {
    const getSales = await salesService.getAllSales();
    return res.status(200).json(getSales);
};

const getSaleById = async (req, res) => {
    const { id } = req.params;
    const getSale = await salesService.getSaleById(id);
    if (getSale.err) {
        return res.status(404).json(getSale);
    }
    return res.status(200).json(getSale);
};

const updateSale = async (req, res) => {
    const array = req.body;
    const validateQuantity = await salesService.validateQuantity(array);
    if (validateQuantity) {
        return res.status(422).json(validateQuantity);
    }
    const { id } = req.params;
    const saleUpdated = await salesService.updateSale(id, array);
    return res.status(200).json(saleUpdated);
};

const deleteSale = async (req, res) => {
    const { id } = req.params;
    const saleDeleted = await salesService.deleteSale(id);
    if (saleDeleted.err) {
        return res.status(422).json(saleDeleted);
    }
    return res.status(200).json(saleDeleted);
};

module.exports = {
    addNewSale,
    getAllSales,
    getSaleById,
    updateSale,
    deleteSale,
};
