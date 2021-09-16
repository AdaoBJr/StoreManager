const salesService = require('../services/saleService');

const createSale = async (req, res) => {
  try {
    const sales = req.body;
    const create = await salesService.createSale(sales);
    return res.status(200).json(create);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
  }
};

const findSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.findSaleById(id);
    if (!sale) {
      return res.status(404).json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    return res.status(200).json(sale);
  } catch (error) {
    console.log(error);
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const update = await salesService.updateSale(id, sales);
    return res.status(200).json(update);
  } catch (error) {
    console.log(error);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const exclude = await salesService.deleteSale(id);
    return res.status(200).json(exclude);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createSale,
  getAll,
  findSaleById,
  updateSale,
  deleteSale,
};