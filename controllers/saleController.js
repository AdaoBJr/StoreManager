const model = require('../models/saleModel');
const service = require('../services/saleService');

const idError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const formatError = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

const existsError = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const getAllSales = async (_req, res) => {
  try {
    const sales = await model.getAll();
    return res.status(200).json({ sales });
  } catch (err) {
    return res.status(404).json(existsError);
  }
};

const getSale = async (req, res) => {
  try {
    const { id } = req.params;

    const exists = await service.readSale(id);

    if (exists === null) {
      return res.status(404).json(existsError);
    }
    const sale = await model.getOne(id);
    return res.status(200).json(sale);
  } catch (err) {
    return res.status(404).json(existsError);
  }
};

const createSale = async (req, res) => {
  const salesList = req.body;
  const createdSale = await service.createSale(salesList);
  if (createdSale === null) return res.status(422).json(idError);

  return res.status(200).json(createdSale);
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    const updatedSale = await service.updateService(id, productId, quantity);
    if (updatedSale === null) return res.status(422).json(idError);

    return res.status(200).json(updatedSale);
  } catch (err) {
    return res.status(404).json(idError);
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const exists = await service.readSale(id);

    if (exists === null) {
      return res.status(422).json(formatError);
    }

    await model.exclude(id);

    res.status(200).json(exists);
  } catch (err) {
    return res.status(422).json(formatError);
  }
};

module.exports = {
  getAllSales,
  createSale,
  getSale,
  updateSale,
  deleteSale,
};
