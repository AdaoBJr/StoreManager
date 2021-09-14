const { StatusCodes } = require('http-status-codes');

const model = require('../models/salesModel');

const registerSale = async (req, res) => {
  try {
    const itemsSold = req.body;
    // console.log(itemsSold);
    const result = await model.registerSale(itemsSold);
    // console.log(result);
    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerSale,
};
