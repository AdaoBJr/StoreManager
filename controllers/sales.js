const rescue = require("express-rescue");
const Joi = require('joi');
const { getById } = require("../models/products");

const httpStatus = {
  ok: 200,
  created: 201,
  notFound: 404,
  invalidData: 422,
};

const validateQuantityArray = (req, res, next) => {
  const sales = req.body;
  const onlyQuantity = sales.map((sale) => sale.quantity || false);
  const schema = Joi.array().items(Joi.number().strict().min(0)).validate(onlyQuantity);
  
  if (schema.error) {
    return res.status(httpStatus.invalidData).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }

  next();
};

const validateIdArray = async (req, res, next) => {
  const sales = req.body;
  const productArray = await sales.map(async ({ productId }) => getById(productId));
  console.log(productArray);
};

const createSale = rescue(async (req, res) => {
  
});

module.exports = {
  validateQuantityArray,
  validateIdArray,
};
