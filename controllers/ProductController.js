const StatusCodes = require('http-status-codes');
const ProductService = require('../services/ProductService');

const create = async (req, res) => {
 const { name, quantity } = req.body;
 const product = await ProductService.create({ name, quantity });
 if (!product) {
  return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Dados inválidos' }); 
}
 return res.status(StatusCodes.CREATED).json({ name, quantity });
};

module.exports = { create };