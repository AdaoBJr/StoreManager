const productsModel = require('../models/productsModel');
const service = require('../services/productsService');

// Tentando refatorar com .then and .catch!!
// Depois refatorar colocando as validacoes em midlewares, pras outras funcoes fircarem mais limpas aqui (na parte do erro)!!

const getAllProducts = (_req, res) => productsModel.getAll()
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(422).json({ message: error.message }));

const getProductById = (req, res) => service.getProductById(req.params.id)
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(422).json({ message: error.message }));

const createProduct = (req, res) => {
    const { name, quantity } = req.body;
    return service.createProduct({ name, quantity })
        .then((result) => res.status(201).json(result))
        .catch((error) => res.status(422).json({ message: error.message }));
};

const updateProduct = (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    return service.updateProduct({ id, name, quantity })
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(422).json({ message: error.message }));
};

const deleteProduct = (req, res) => service.deleteProduct(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch((error) => res.status(422).json({ message: error.message }));
    
module.exports = {
    getAllProducts, 
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
};
