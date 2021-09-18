const { StatusCodes } = require('http-status-codes');
const model = require('./productModels');
const service = require('./productServices');

const getAllProducts = async (_req, res) => {
  try {
    const products = await model.getAllProducts();
    return res.status(StatusCodes.OK).json(products);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await service.getProductById(id);

    if (result === null) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'não cadastrado' });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const result = await service.createProduct(name, quantity);

    if (result === null) {
      return res.status(StatusCodes.BAD_REQUEST)
        .json({ message: 'erro, produto já foi cadastrada' });
    }

    return res.status(StatusCodes.CREATED).json(result);
  } catch (err) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const result = await model.updateProduct(id, name, quantity);
    if (result === null) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Não atualizado' });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await model.deleteProduct(id);
    if (!result) return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'deu erro' });
    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
