const { StatusCodes } = require('http-status-codes');
const productsService = require('../services/productsService');

const getAllProducts = async (req, res) => {
  try {
    const products = await productsService.getProducts();
    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Ops, algo de errado :( ' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProducts(id);
    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

const errorHandler = (res, err) => {
  const code = 'invalid_data';
  const msg = [
    'Product already exists',
    '"name" length must be at least 5 characters long',
  ];
  switch (err) {
    case 'ALREADY_EXIST':
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        err: { code, message: msg[0] },
      });
    case 'INVALID_LENGTH':
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        err: { code, message: msg[1] },
      });
    default:
      return {};
  }
};

const errorHandler2 = (res, err) => {
  const code = 'invalid_data';
  const msg = [
    '"quantity" must be larger than or equal to 1',
    '"quantity" must be a number',
  ];
  switch (err) {
    case 'INVALID_QUANTITY':
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        err: { code, message: msg[0] },
      });
    case 'MUST_BE_NUMBER':
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        err: { code, message: msg[1] },
      });
    default:
      return {};
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await productsService.createProduct({ name, quantity });

    errorHandler(res, result.err);
    errorHandler2(res, result.err);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Ops, algo de errado :( ' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    const result = await productsService.updateProduct({ id, name, quantity });

    errorHandler(res, result.err);
    errorHandler2(res, result.err);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Ops, algo de errado :( ' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(id);

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
