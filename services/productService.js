const productsModel = require('../models/productsModel');

const create = (product) => productsModel.create(product)
  .then((data) => ({ status: 201, data }));

const getAll = () => productsModel.getAll().then((data) => ({ status: 200, data }));

const getById = (id) => productsModel.getById(id).then((data) => ({ status: 200, data }));

const update = (id, name, quantity) => productsModel.update(id, name, quantity)
  .then((data) => ({ status: 200, data }));

const excluse = (id) => productsModel.excluse(id).then((data) => ({ status: 200, data }));

module.exports = {
    create,
    getAll,
    getById,
    update,
    excluse,
};