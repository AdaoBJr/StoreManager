const rescue = require('express-rescue');
const SaleService = require('../services/salesService');

const createSale = rescue(async (req, res) => {
  const { body } = req;
  const Obj = await SaleService.createSale(body);
  if (Obj.err) {
   return res.status(422).json(Obj);
  } 
  return res.status(200).json(Obj);
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const Obj = await SaleService.getSaleById(id);
  if (Obj.err) {
    return res.status(404).json(Obj);
   } 
   return res.status(200).json(Obj);
});

const getSales = rescue(async (req, res) => {
  const Obj = await SaleService.getSales();
   return res.status(200).json(Obj);
});

const updateSaleId = rescue(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const Obj = await SaleService.updateSaleId(id, body);
  if (Obj.err) {
    return res.status(422).json(Obj);
   } 
   return res.status(200).json(Obj);
});

const deleteSaleId = rescue(async (req, res) => {
  const { id } = req.params;
  const Obj = await SaleService.deleteSaleId(id);
  if (Obj.err) {
    return res.status(422).json(Obj);
   } 
   return res.status(200).json(Obj);
});

module.exports = {
  createSale,
  getSaleById,
  getSales,
  updateSaleId,
  deleteSaleId,
};