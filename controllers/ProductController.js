const StatusCodes = require('http-status-codes');
const ProductService = require('../services/ProductService');

const getAll = async () => 

const create = async (req, res) => {
const { name, quantity } = req.body;
 const product = await ProductService.create({ name, quantity });
 
 const { id } = product;
 if (!product) {
  return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Dados inválidos' }); 
}
 return res.status(StatusCodes.CREATED).json({ id, name, quantity });
};

module.exports = { create };