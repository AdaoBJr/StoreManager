const salesModel = require('../models/salesModel');
const service = require('../services/salesService');

const saleNotFound = {
  err: { 
    code: 'not_found', 
    message: 'Sale not found', 
  } };

const getAllSales = async (_req, res) => salesModel.getAll()
    .then((sales) => res.status(200).json(sales))
    .catch((error) => res.status(422).json({ message: error.message }));

// Ver qual a treta dessa funcao... Tah muito estranha ela!! Ajuda da Maiara Borsati para ajeitar ela!! ;)  
const getSaleById = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await salesModel.saleById(id);
      if (!result) {
          return res.status(404).json(saleNotFound);
      }
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

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

const updateSale = async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;
  try {
      const result = await service.updateSaleService(id, itensSold);
      if (result.err) { return res.status(422).json(result); }
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  return service.deleteSale(id).then((result) => {
      if (result.err) { return res.status(422).json(result); }
      return res.status(200).json(result);
  }).catch((error) => res.status(422).json({ message: error.message }));
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};