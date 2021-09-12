const { ObjectId } = require('mongodb');
const conexao = require('./conection');

// const { getAll } = require('./productModel');

// const getAll = async () => {
//   const conect = await conexao();
//   const db = await conect.collection('products').find().toArray();
//   // console.log(db);
//   return db;
// };

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   const conect = await conexao();
//   const db = await conect.collection('products').findOne(ObjectId(id));
//   return db;
// };

// const getByName = async (name) => {
//   const conect = await conexao();
//   const db = await conect.collection('products').findOne({ name });
//   return db;
// };

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await conexao();
  return db.collection('sales').findOne(ObjectId(id));
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
  // getByName,
  // getAll,
  // getById,
  update,
  excluse,
  findById,
};
