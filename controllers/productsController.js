const productService = require('../services/productsService');

function validName(req, res, next) {
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

async function validDistinticName(req, res, next) {
  const { name } = req.body;
  const sameProduct = await productService.isValidNameDifferentName(name);

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

function validQuantity(req, res, next) {
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

async function createProduct(req, res) {
    const { name, quantity } = req.body;

    const product = await productService.createProduct({ name, quantity });

    res.status(201).json(product);
}

module.exports = {
  validName,
  validDistinticName,
  validQuantity,
  createProduct,
};
