const { HTTP_OK_STATUS } = require('../httpResponde');
const salesService = require('../service/salesService');

const createSales = async (req, res) => {
    const soldItens = req.body;
    const salesInfo = await salesService.createSales(soldItens);

    return res.status(HTTP_OK_STATUS).send(salesInfo);
};

const getAllSales = async (_req, res) => {
    const allSales = await salesService.getAllSales();

    return res.status(HTTP_OK_STATUS).send(allSales);
};

const getSalesById = async (req, res) => {
    const { id } = req.body;
    const sale = await salesService.getSalesById(id);

    return res.status(HTTP_OK_STATUS).send(sale);
};

const updateSale = async (req, res) => {
    const itensSold = req.body;
    const { id } = req.params;
    const updatedSale = await salesService.updateSale({ id, itensSold });

    return res.status(HTTP_OK_STATUS).send(updatedSale);
};

const deleteSaleById = async (req, res) => {
    const { id } = req.params;
    const deletedSales = await salesService.deleteSalesById(id);
    
    return res.status(HTTP_OK_STATUS).send(deletedSales);
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
    updateSale,
    deleteSaleById,
};