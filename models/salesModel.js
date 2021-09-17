const { ObjectId } = require('mongodb');
const conexao = require('./conection');

// const { getAll } = require('./productModel');

const getAll = async () => {
  const db = await conexao();
  return db.collection('sales').find().toArray();
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const result = await db.collection('sales').findOne(ObjectId(id));
  return result;
};

const getBy = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  console.log(id);
  const db = await conexao();
  const result = await db.collection('sales').findOne(ObjectId(id));

  return result;
};

const createSales = async (sales) => {
  const conect = await conexao();

  const db = await conect.collection('sales').insertOne(
    { 
      itensSold: sales, 
    },
  );

  return db;
};

const update = async (id, updates) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updates } });
  return findById(id);
};

const excluse = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  const sales = await findById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sales;
};

module.exports = {
  createSales,
  getBy,
  // getByName,
  getAll,
  // getById,
  update,
  excluse,
  findById,
};
