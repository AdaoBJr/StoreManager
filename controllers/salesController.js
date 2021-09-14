// const HTTP_OK_STATUS = 201;
const HTTP_OK_DUZENTOS = 200;
// const HTTP_ERR_FALSE = 422;

const salesModel = require('../models/sales');

const createNewSale = async (req, res) => {
const allProductSales = req.body;
const newSale = await salesModel.addSale(allProductSales);

return res.status(HTTP_OK_DUZENTOS).json(newSale);
};

module.exports = {
    createNewSale,
};