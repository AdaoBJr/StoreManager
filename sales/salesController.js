const { StatusCodes } = require('http-status-codes');
const service = require('./salesServices');

const validQuantity = (req, res, next) => {
  const quantityVerified = service.validQuantity(req.body);
  const quantityTypeVerified = service.validTypeQuantity(req.body);
  if (quantityVerified.length !== 0 || quantityTypeVerified.length !== 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

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
    const arrays = req.body;

    const response = await service.create(arrays);

    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await service.update(id, req.body);

    if (!result) {
        return res.status(422).json({
            err: { code: 'invalid_data', message: 'Product already exists' },
        });
    }

    return res.status(200).json({ _id: id, itensSold: req.body });
  } catch (error) {
    return res.status(500).json({ message: 'Ops, algo de errado :( ' });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await service.remove(id);

    return res.status(StatusCodes.OK).json(product);
  } catch (error) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  validQuantity,
};
