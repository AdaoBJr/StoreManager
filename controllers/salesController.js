const salesService = require('../services/salesService');

const create = async (req, res) => {
  const salesBody = req.body;
  const result = await salesService.create(salesBody);
  if (result !== null) {
  return res.status(200).json(result);
  }
  return res.status(422).json({
    err: {
      code: 'Invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  });
};

const getAll = async (req, res) => {
  try {
    const sales = await salesService.getAll();
    return res.status(200).json({ sales });
  } catch (error) {
    return res.status(422).json({
      err: {
        code: error.code,
        message: error.message,
      },
    });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

    const sale = await salesService.getById(id);
    if (sale !== null) { return res.status(200).json(sale); }

    return res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
  });
};

module.exports = {
  create,
  getAll,
  getById,
};