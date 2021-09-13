const productModel = require('../models/products');

const HTTP_OK_STATUS = 201;

const createNewProduct = async (req, res) => {
     const { name, quantity } = req.body;
     console.log('Entrei no controller');
     // abaixo é a função que vai adicionar um produto!
    const newUser = await productModel.addProduct(name, quantity);
    return res.status(HTTP_OK_STATUS).json(newUser);
};

module.exports = {
    createNewProduct,
};