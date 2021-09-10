const { StatusCodes } = require('http-status-codes');
const model = require('../models/productsModel');

const registerProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await model.registerProduct(name, quantity);
    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Ops' });
  }
};

module.exports = {
  registerProduct,
};
