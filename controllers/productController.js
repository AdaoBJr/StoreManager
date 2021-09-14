const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAllService();
    return res.status(StatusCodes.OK).json({ products });
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send('Sorry! There is something wrong!');
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = await productService.getByIdService(id);
    if (productId === false) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ 
        err: { 
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    return res.status(StatusCodes.OK).json(productId);
  } catch (error) {
    console.log(error);
  }
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const createProduct = await productService.createService({ name, quantity });
    return res.status(StatusCodes.CREATED).json(createProduct);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send('Sorry! There is something wrong!');
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const updateProduct = await productService.updateService({ id, name, quantity });
    return res.status(StatusCodes.OK).json(updateProduct);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY)
      .send('Sorry! There is something wrong!');
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productService.deleteService({ id });
    return res.status(StatusCodes.OK).json(deletedProduct);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ 
      err: { 
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
};

// const remove = async (req, res) => {};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteProduct,
  // remove,
};
