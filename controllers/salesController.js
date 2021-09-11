const salesService = require('../services/salesService');

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

module.exports = {
  getAll,
  getById,
};