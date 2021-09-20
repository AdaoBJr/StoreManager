const salesService = require('../services/saleService');

const create = (req, res) => salesService.create([...req.body])
  .then(({ status, data }) => res.status(status).json(data));

const getAll = (_req, res) => salesService.getAll()
  .then(({ status, data }) => res.status(status).json({ sales: data }));

const getById = (req, res) => salesService.getById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

const update = ({ body: [...args], params: { id } }, res) => salesService.update(id, args)
  .then(({ status }) => res.status(status).json({ _id: id, itensSold: args }));

const excluse = (req, res) => salesService.excluse(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluse,
};