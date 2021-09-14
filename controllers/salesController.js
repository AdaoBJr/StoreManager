// const HTTP_OK_STATUS = 201;
const HTTP_OK_DUZENTOS = 200;
// const HTTP_ERR_FALSE = 422;

const salesModel = require('../models/sales');

const createNewSale = async (req, res) => {
const allProductSales = req.body;
const newSale = await salesModel.addSale(allProductSales);

return res.status(HTTP_OK_DUZENTOS).json(newSale);
};

const getAll = async (req, res) => {
    const newSale = await salesModel.findAllSales();
    
    return res.status(HTTP_OK_DUZENTOS).json({ sales: newSale });
    };
    
    const getById = async (req, res) => {
        const { id } = req.params;
        const saleById = await salesModel.findSaleById(id);
        console.log(saleById);
        return res.status(HTTP_OK_DUZENTOS).json(saleById);
    };
module.exports = {
    createNewSale,
    getAll,
    getById,
};