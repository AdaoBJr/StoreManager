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
      // console.log(result);
      if (!result || result === null) {
        return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
      }
      return res.status(200).json(result);
  } catch (error) {
      return res.status(500).json({ message: err });
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

// requisitos 7 e 8 com a ajuda de Jonathan Souza 

const updateSale = async (req, res) => {
    try {
        const itensSold = req.body;
        const { id } = req.params;

        const result = await saleService.updateSale({ id, itensSold });
        if (result.erro) {
          return res.status(422).json({ err: { code: 'invalid_data', message: result.erro } });
        }

        return res.status(200).json({ _id: id, itensSold });
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await saleService.excludeSale(id);

        console.log(result);

        if (!result || result === null) {
            return res.status(422)
            .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
          }

        if (result) return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

module.exports = { getAllSales, getSale, createSale, updateSale, deleteSale };