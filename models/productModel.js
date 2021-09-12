const { ObjectId } = require('mongodb');
const conexao = require('./conection');

const getAll = async () => {
  const conect = await conexao();
  const db = await conect.collection('products').find().toArray();
  return db;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conect = await conexao();
  const db = await conect.collection('products').findOne(ObjectId(id));
  return db;
};

const getByName = async (name) => {
  const conect = await conexao();
  const db = await conect.collection('products').findOne({ name });
  return db;
};

const create = async (name, quantity) => {
  const conect = await conexao();
  const db = await conect.collection('products').insertOne({ name, quantity });
  return db;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const conect = await conexao();
  const db = await conect.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return db;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await getById(id);

  if (!product) return null;

  const conect = await conexao();
  await conect.collection('products')
    .deleteOne({ _id: ObjectId(id) });
  
  return product;
};

const updateQuantity = async ({ productId, quantity: quantUpdate }) => {
  const MAGIC = 2;
  const db = await conexao();
  const { modifiedCount } = await db.collection('products').updateOne(
    {
      _id: ObjectId(productId),
      quantity: { $gte: quantUpdate },
    },
    { $inc: { quantity: quantUpdate - quantUpdate * MAGIC } },
  );
  return modifiedCount;
};

const updateDelete = async ({ productId, quantity: quantUpdate }) => {
  const db = await conexao();
  return db
    .collection('products')
    .updateOne({ _id: ObjectId(productId) }, { $inc: { quantity: quantUpdate } });
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  exclude,
  updateQuantity,
  updateDelete,
};
