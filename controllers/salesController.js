const salesService = require('../services/salesService');

async function validateQuantity(req, res, next) {
  const sales = req.body;

  if (!salesService.isValidQuantity(sales)) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong product ID or invalid quantity', 
       } });
  }

  next();
}

async function create(req, res) {
  const sales = req.body;

  const newSales = await salesService.create(sales);

  res.status(200).json(newSales);
}

async function getAll(_req, res) {
  const sales = await salesService.getAll();

  if (!sales) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ sales });
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
  
    if (sale === null) {
      return res.status(404).json({
        err: { 
          code: 'not_found', 
          message: 'Sale not found', 
        } });
    }

    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({
      err: { 
        code: 'not_found', 
        message: 'Sale not found', 
      } });
  }
}

async function update(req, res) {
  const itensSold = req.body;
  const { id } = req.params;

  const updateSale = await salesService.update(id, itensSold);
  if (!updateSale) {
    return res.status(404).json({ message: 'Not Found' });
  }

  return res.status(200).json(updateSale);
}

module.exports = {
  validateQuantity,
  create,
  getAll,
  getById,
  update,
};