const { ObjectId } = require('mongodb');
const connection = require('../connections/mongoDBConnection');
const service = require('./salesServices');

const getAll = async () => {
  const db = await connection();

  await service.getAll(db);

  return db.collection('sales').find().toArray();
};

const getById = async (id) => {
  const db = await connection();

  const objectId = await (ObjectId.isValid(id));
  await service.getById(objectId, id);

  const sale = db.collection('sales').findOne({ _id: ObjectId(id) });

  return sale;
};

const create = () => {};

const update = (_id) => {};

const remove = (_id) => {};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
