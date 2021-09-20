const salesService = require('../services/SalesService');

const addNewSale = async (req, res) => {
    const array = req.body;
    const validQuantity = await salesService.validateQuantity(array);
    if (validQuantity) {
        return res.status(422).json(validQuantity);
    }
    const addSales = await salesService.addNewSale(array);
    res.status(200).json(addSales);
};

module.exports = {
    addNewSale,
};
