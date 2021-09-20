const rescue = require('express-rescue');
const services = require('../services/productService');

// const STATUS_CREATED = 201;
const STATUS_OK = 200;

const create = (req, res) => services.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = rescue(async (_req, res) => {
  const getProduct = await services.getAll();
    
  return res.status(STATUS_OK).json(getProduct);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const findId = await services.getById(id);

  return res.status(STATUS_OK).json(findId);
});

const update = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updateProduct = await services.update(id, name, quantity);

  return res.status(STATUS_OK).json(updateProduct);
});

const excluse = rescue(async (req, res) => {
  const { id } = req.params;
  const deletedProduct = await services.excluse(id);

  return res.status(STATUS_OK).json(deletedProduct);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluse,
};