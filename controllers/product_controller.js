const { create, getAll, getById } = require('../services/pruduct_services');

// Cadatrar produtos
const createProduct = async (req, res) => {
    const { name, quantity } = req.body;

    const product = await create(name, quantity);

    return res.status(201).json(product);
};

const getAllProducts = async (req, res) => {
    const products = await getAll();
    // tem que retornar umobj com o array products e a lista dentro
    return res.status(200).json({ products });
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    // console.log(id, 'id');
    const product = await getById(id);
    // console.log(product, 'product');
    return res.status(200).json(product);
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
};