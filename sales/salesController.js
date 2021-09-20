const { StatusCodes } = require('http-status-codes');
const model = require('./salesModels');

const getAll = async (_req, res) => {
  try {
    const sales = await model.getAll();

    return res.status(StatusCodes.OK).json({ sales });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await model.getById(id);

    return res.status(StatusCodes.OK).send(sale);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json(error);
  }
};

const create = (_req, _res) => {};

const update = (_req, _res) => {};

const remove = (_req, _res) => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
