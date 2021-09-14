const saleModel = require('../models/saleModel');
const saleService = require('../services/saleService');

const err = 'Ops, algo de errado :( ';

const getAllSales = async (_req, res) => {
    try {
        const sales = await saleModel.getAll();
        return res.status(200).json({ sales });
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

const getSale = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await saleModel.saleIdExists(id);
      return res.status(200).json(result);
  } catch (error) {
      return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
};

const createSale = async (req, res) => {
    try {
        const itensSold = req.body;
        const result = await saleService.createSale(itensSold);

        if (result.erro) {
          return res.status(422).json({ err: { code: 'invalid_data', message: result.erro } });
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const { id } = req.params;

        const result = await saleService.updateProduct({ id, name, quantity });
        if (result.erro) {
          return res.status(422).json({ err: { code: 'invalid_data', message: result.erro } });
        }

        return res.status(200).json({ id, name, quantity });
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await saleService.exclude(id);

        if (result) return res.status(200).json(result);
    } catch (error) {
      return res.status(422).json({
       err: { code: 'invalid_data', message: 'Wrong id format' } }); 
    }
};

module.exports = { getAllSales, getSale, createSale, updateProduct, deleteProduct };