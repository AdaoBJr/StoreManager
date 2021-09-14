const productsService = require('../services/productsService');

const unprocessableEntity = 422;
const ok = 200;

const validName = (req, res, next) => {
  const { name } = req.body;
  const validateName = productsService.validationName(name);

  if (!validateName) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const velidExistenceProduct = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsService.verifyExistanceProduct(name);

  if (product) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validateQuantity = productsService.validationQuantity(quantity);

  if (!validateQuantity) {
    return res.status(unprocessableEntity).json({
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

const validTypeQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validateQuantity = productsService.validationTypeQuantity(quantity);

  if (!validateQuantity) {
    return res.status(unprocessableEntity).json({
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const result = await productsService.createProduct({ name, quantity });

    return res.status(201).json(result);
};

const validId = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.verifyId(id);
  if (!product) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(ok).json(product);
};

const AllProducts = async (req, res) => {
  const getAllProducts = await productsService.getAllProducts();

  if (!getAllProducts) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format', 
      },
    });
  } 
  return res.status(ok).json({ products: getAllProducts });
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  await productsService.verifyUpdateProduct(id, name, quantity);

  return res.status(ok).json({ id, name, quantity });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body; 
  const product = await productsService.verifyDeleteProduct(id);

  if (!product) {
    return res.status(unprocessableEntity).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format', 
      },
    });
  }

  return res.status(ok).json({ id, name, quantity });
};

module.exports = {
  validName,
  velidExistenceProduct,
  validQuantity,
  validTypeQuantity,
  createProduct,
  validId,
  AllProducts,
  editProduct,
  deleteProduct,
};