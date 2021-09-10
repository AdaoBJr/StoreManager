const productService = require('../services/productsService');

function validateNameLength(req, res, next) {
  const { name } = req.body;

  if (!productService.isValidName(name)) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data', 
        message: '"name" length must be at least 5 characters long', 
       },
    });
  }
  
  next();
}

async function validateDistinctName(req, res, next) {
  const { name } = req.body;
  const sameProduct = await productService.isValidDifferentName(name);

  if (!sameProduct) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }

  next();
}

function validateQuantity(req, res, next) {
  const { quantity } = req.body;
  
  if (!productService.isValidQuantityMin(quantity)) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data', 
        message: '"quantity" must be larger than or equal to 1', 
      }, 
    });
  }

  if (!productService.isValidQuantity(quantity)) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data', 
        message: '"quantity" must be a number', 
      }, 
    });
  }

  next();
}

async function create(req, res) {
    const { name, quantity } = req.body;

    const product = await productService.create({ name, quantity });

    return res.status(201).json(product);
}

async function getAll(_req, res) {
  const products = await productService.getAll();

  if (!products) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ products });
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);

    if (product === null) {
      return res.status(422).json({
        err: { 
         code: 'invalid_data', 
          message: 'Wrong id format', 
        } });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data', 
        message: 'Wrong id format', 
      } });
  }
}

module.exports = {
  validateNameLength,
  validateDistinctName,
  validateQuantity,
  create,
  getAll,
  getById,
};
