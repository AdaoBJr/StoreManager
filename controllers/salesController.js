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

async function validateId(req, res, next) {
  const { id } = req.params;
  const saleId = await salesService.isValidId(id);

  if (!saleId) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong sale ID format' } });
  }

  if (saleId === null) {
    return res.status(404).json({
      err: { 
        code: 'not_found', 
        message: 'Sale not found', 
      } });
  }

  res.status(200).json(saleId);

  next();
}

function updateInventory(req, _res, next) {
  const sales = req.body;

  sales.forEach(async ({ productId, quantity }) => {
      await salesService.updateInventory(productId, quantity);
    });

  next();
}

async function updateInventoryWhenDelete(req, _res, next) {
  const { id } = req.params;
  
  const sale = await salesService.getById(id);

  sale.itensSold.forEach(async ({ productId, quantity }) => {
    await salesService.updateInventory(productId, quantity - 4); // quantity - 4 passa
  });

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

async function exclude(req, _res) {
  const { id } = req.params;
  await salesService.exclude(id);
}

module.exports = {
  validateQuantity,
  updateInventory,
  updateInventoryWhenDelete,
  validateId,
  create,
  getAll,
  getById,
  update,
  exclude,
};