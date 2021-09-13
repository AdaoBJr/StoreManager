const ProductsModel = require('../models/ProductsModel');

const validName = (req, _res, next) => {
  const { name } = req.body;
  console.log(name);
   const num = 5;
   const men = 'name length must be at least 5 characters long';
   if (!name || name.length < num) {
     const err = new Error(men);
     err.status = 422;
     err.code = 'Invalid_data';
     return next(err);
  }
   next();
};

const validNameExists = async (req, _res, next) => {
  const { name } = req.body;
  const product = await ProductsModel.findByName(name);
  const men = 'Product already exists';
  if (product) {
    const err = new Error(men);
    err.status = 422;
    err.code = 'Invalid_data';
    return next(err);
  }
  next();
};

const validQuantity = (req, _res, next) => {
  const { quantity } = req.body;
  const num = 1;
  const mens = '"quantity" must be larger than or equal to 1';
  const men = '"quantity" must be a number';
  if (quantity < num) {
    const err = new Error(mens);
    err.status = 422;
    err.code = 'Invalid_data';
    return next(err);
  }
  if (Number.isNaN(+quantity)) {
    const err = new Error(men);
    err.status = 422;
    err.code = 'Invalid_data';
    return next(err);
  }
  next();
};

const validId = (req, res, next) => {
  const { id } = req.params;
  const rege = /[0-9A-Fa-f]{6}/g;
  if (!rege.test(id)) {
    const mens = 'Wrong id format';
    const err = new Error(mens);
    err.status = 422;
    err.code = 'Invalid_data';
    return next(err);
  }
   next();
};

module.exports = {
  validName,
  validNameExists,
  validQuantity,
  validId,
};