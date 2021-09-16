// const HTTP_OK_STATUS = 201;
const HTTP_OK_DUZENTOS = 200;
// const HTTP_ERR_FALSE = 422;
const HTTP_ERR_FALSE = 422;

const erroMaker = require('../services/salesServices');
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
        const message = 'Sale not found';
        const saleById = await salesModel.findSaleById(id);

        if (!saleById) {
            return res.status(404).json(erroMaker.erroMensageSales(message));
        }
        return res.status(HTTP_OK_DUZENTOS).json(saleById);
    };

const updateById = async (req, res) => {
    const { id } = req.params;
    const productsSoldOut = req.body;
    await salesModel.updateSaleByid(id, { productsSoldOut });
    return res.status(HTTP_OK_DUZENTOS).json({
        _id: id,
        itensSold: productsSoldOut,
    });
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    const sales = await salesModel.findSaleById(id);
    if (!sales) {
        return res.status(HTTP_ERR_FALSE).json({
          err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format' } });
      }

    await salesModel.deleteSaleByid(id);
    return res.status(HTTP_OK_DUZENTOS).json(sales);
};

module.exports = {
    createNewSale,
    getAll,
    getById,
    updateById,
    deleteById,
};