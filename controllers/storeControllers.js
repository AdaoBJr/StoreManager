const storeModel = require('../models/storeModel');
const storeService = require('../services/storeService');

const getAllProducts = async (_req, res) => {
    try {
        const products = await storeModel.getAll();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
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
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const { id } = req.params;

        const result = await storeModel.update({ id, name, quantity });
        // TODO: Implementar o uso do service
        if (!result) return res.status(400).json({ message: 'Não foi possivel...' });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await storeModel.exclude(id);

        if (!result) return res.status(400).json({ message: 'Não foi possivel...' });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Ops, algo de errado :( ' });
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };