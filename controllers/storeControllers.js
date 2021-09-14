const storeModel = require('../models/storeModel');
const storeService = require('../services/storeService');

const err = 'Ops, algo de errado :( ';

const getAllProducts = async (_req, res) => {
    try {
        const products = await storeModel.getAll();
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

const getProduct = async (req, res) => {
  try {
      const { id } = req.params;
      const result = await storeModel.productIdExists(id);
      return res.status(200).json(result);
  } catch (error) {
      return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
};

const createProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const result = await storeService.createProduct({ name, quantity });

        if (result.erro) {
          return res.status(422).json({ err: { code: 'invalid_data', message: result.erro } });
        }

        return res.status(201).json(result);
    } catch (error) {
        return res.status(500).json({ message: err });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const { id } = req.params;

        const result = await storeService.updateProduct({ id, name, quantity });
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
        const result = await storeService.exclude(id);

        if (result) return res.status(200).json(result);
    } catch (error) {
      return res.status(422).json({
       err: { code: 'invalid_data', message: 'Wrong id format' } }); 
    }
};

module.exports = { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };