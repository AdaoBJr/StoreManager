const { StatusCodes } = require('http-status-codes');
const service = require('./salesServices');

const getAll = async (_req, res) => {
  try {
    const sales = await service.getAll();

    return res.status(StatusCodes.OK).json({ sales });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await service.getById(id);

    return res.status(StatusCodes.OK).json(sale);
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).json(error);
  }
};

const create = async (req, res) => {
  try {
    const sales = req.body;

    await service.create(sales);

    return res.status(200).json('deu bom');
  } catch (error) {
    return res.status(500).json(error);
  }
};

const update = (_req, _res) => {};

const remove = (_req, _res) => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
