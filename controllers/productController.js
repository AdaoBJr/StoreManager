const productModel = require('../models/products');

const HTTP_OK_STATUS = 201;
const HTTP_OK_DUZENTOS = 200;

const getAll = async (_req, res) => {
    // abaixo é a função que vai adicionar um produto!
   const allProducts = await productModel.findAll();
   return res.status(HTTP_OK_DUZENTOS).json({ products: allProducts });
};

const getById = async (req, res) => {
    const { id } = req.params;
    // abaixo é a função que vai adicionar um produto!
   const productById = await productModel.findById(id);
   console.log(productById, 'product no meu controller');
   return res.status(HTTP_OK_DUZENTOS).json(productById);
};

const createNewProduct = async (req, res) => {
     const { name, quantity } = req.body;
     // abaixo é a função que vai adicionar um produto!
    const newUser = await productModel.addProduct(name, quantity);
    return res.status(HTTP_OK_STATUS).json(newUser);
};

module.exports = {
    createNewProduct,
    getAll,
    getById,
};