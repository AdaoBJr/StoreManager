const salesModel = require('../models/salesModel');

const create = (itensSold) => {
  itensSold.forEach((i) => salesModel.updateStock(i.productId, -i.quantity));
  return salesModel.create(itensSold).then((data) => ({ status: 200, data }));
};

const getAll = () => salesModel.getAll().then((data) => ({ status: 200, data }));

const getById = (id) => salesModel.getById(id).then((data) => ({ status: 200, data }));

const update = (id, itensSold) => {
  itensSold.forEach((i) => salesModel.updateStock(i.productId, -i.quantity));
  return salesModel.update(id, itensSold).then((data) => ({ status: 200, data }));
};

const excluse = (id) => {
  salesModel.getById(id).then(({ itensSold }) =>
    itensSold.forEach((i) => salesModel.updateStock(i.productId, i.quantity)));
  return salesModel.excluse(id).then((data) => ({ status: 200, data }));
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  excluse,
};