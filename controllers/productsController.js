const services = require('../services/productService');

const create = (req, res) => services.create(req.body)
  .then(({ status, data }) => res.status(status).json(data));

const getAll = (_req, res) => services.getAll()
  .then(({ status, data }) => res.status(status).json({ products: data }));

const getById = (req, res) => services.getById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

const update = (req, res) => services.update(req.params.id, req.body)
  .then(({ status }) => res.status(status).json({ _id: req.params.id, ...req.body }));

const excluse = (req, res) => services.excluse(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluse,
};