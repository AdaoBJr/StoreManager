const { create } = require('../services/pruduct_services');

// Cadatrar produtos
const createProduct = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await create({ name, quantity });

    return res.status(201).json(product);
};

module.exports = {
    createProduct,
};