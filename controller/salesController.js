const { HTTP_OK_STATUS } = require('../httpResponde');
const salesService = require('../service/salesService');

const createSales = async (req, res) => {
    const soldItens = req.body;
    const salesInfo = await salesService.createSales(soldItens);

    return res.status(HTTP_OK_STATUS).send(salesInfo);
};

module.exports = {
    createSales,
};