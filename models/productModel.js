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

const checkSales = async ({ productId, quantity }) => {
  const conect = await conexao();
  
  const result = await conect.collection('products').findOne(
    {
      _id: ObjectId(productId),
      quantity: { $gte: +quantity },
    },
  );
  // console.log(result);
  return result;
};

module.exports = {
  create,
  getByName,
  getAll,
  getById,
  update,
  exclude,
  checkSales,
};
