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

module.exports = {
    addNewSale,
    getAllSales,
    getSaleById,
};
