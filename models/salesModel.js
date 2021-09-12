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

const createSales = async (sales) => {
  const conect = await conexao();

  const db = await conect.collection('sales').insertOne(
    { 
      itensSold: sales, 
    },
  );

  return db;
};

const update = async (id, newSales) => {
  if (!ObjectId.isValid(id)) return null;
  const conect = await conexao();
  const db = await conect.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: newSales } });
  return db;
};

// const exclude = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   const product = await getById(id);

//   if (!product) return null;

//   const conect = await conexao();
//   await conect.collection('products')
//     .deleteOne({ _id: ObjectId(id) });
  
//   return product;
// };

module.exports = {
  createSales,
  // getByName,
  // getAll,
  // getById,
  update,
  // exclude,
};
