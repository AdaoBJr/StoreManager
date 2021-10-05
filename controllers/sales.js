const service = require('../services/sales');

const allSales = async (req, res) => {
    const result = await service.allSales();
    return res.status(200).json(result);
};

const selectById = async (req, res) => {
    const { id } = req.params;
    const result = await service.selectById(id);
    return res.status(200).json(result);
};

const newSale = async (req, res) => {
    const sale = req.body;
    const result = await service.newSale(sale);
    return res.status(200).json(result);
};

const saleUpdate = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;
  const result = await service.saleUpdate(id, sale);
  return res.status(200).json(result);
};

const saleDelete = async (req, res) => {
    const { id } = req.params;
    const result = await service.saleDelete(id);
    return res.status(200).json(result);
  };

module.exports = {
    newSale,
    allSales,
    selectById,
    saleUpdate,
    saleDelete,
};
