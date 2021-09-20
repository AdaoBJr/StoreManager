const salesModel = require('../models/salesModel');
const service = require('../services/salesService');

const saleNotFound = {
  err: { 
    code: 'not_found', 
    message: 'Sale not found', 
  } };

const getAllSales = (_req, res) => salesModel.getAll()
    .then((sales) => res.status(200).json(sales))
    .catch((error) => res.status(422).json({ message: error.message }));

// Ver qual a treta dessa funcao... Tah muito estranha ela!! Ajuda da Maiara Borsati para ajeitar ela!! ;)  
const getSaleById = (req, res) => salesModel.saleById(req.params.id)
  .then((result) => {
    if (!result) { return res.status(404).json(saleNotFound); }
  return res.status(200).json(result);
  }).catch((error) => res.status(422).json({ message: error.message }));

  // Ver de refatorar essa createSale depois!!
const createSale = async (req, res) => {
  try {
      const itensSold = req.body;
      const result = await service.createSale(itensSold);
      if (result.err) { 
        return res.status(422).json(result); 
      }
      return res.status(200).json(result);
  } catch (error) {
      return res.status(422).json({ message: error.message });
  }
};

const updateSale = (req, res) => service.updateSaleService(req.params.id, req.body)
  .then((result) => {
    if (result.err) { return res.status(422).json(result); }
    return res.status(200).json(result);
  }).catch((error) => res.status(422).json({ message: error.message }));

const deleteSale = (req, res) => service.deleteSale(req.params.id)
    .then((result) => {
      if (result.err) { return res.status(422).json(result); }
      return res.status(200).json(result);
  }).catch((error) => res.status(422).json({ message: error.message }));

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};