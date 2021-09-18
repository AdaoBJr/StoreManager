const productsServices = require('../services/productsService');

const errNameLength = {
  err: {
    code: 'invalid_data', message: '"name" length must be at least 5 characters long',
  },
};

const errExists = {
  err: {
    code: 'invalid_data', message: 'Product already exists',
  },
};

const errQuantityLength = {
  err: {
    code: 'invalid_data', message: '"quantity" must be larger than or equal to 1',
  },
};

const errQuantityNotNumber = {
  err: {
    code: 'invalid_data', message: '"quantity" must be a number',
  },
};

async function create(req, res) {
  const { name, quantity } = req.body;
  const products = await productsServices.create({ name, quantity });
  
  if (products === '< then 5') return res.status(422).json(errNameLength);
  if (products === 'name exists') return res.status(422).json(errExists);
  if (products === 'quantity < 0') return res.status(422).json(errQuantityLength);
  if (products === 'quantity not a number') return res.status(422).json(errQuantityNotNumber);

  return res.status(201).json(products);
}

module.exports = {
  create,
};