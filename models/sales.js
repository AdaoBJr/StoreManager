const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  console.log('model');
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getSaleById = async (id) => {
  console.log('modelID');
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

// const findProduct = async (name) => {
//   const db = await connection();
//   return db.collection('products').findOne({ name });
// };

const createSale = async ([itensSold]) => {
  const db = await connection();
  return db.collection('sales').insertMany([{ itensSold }]);
};

const updateSale = async (id, productId, quantity) => {
  const db = await connection();
  return db.collection('products').updateOne({ ObjectId: id },
  { $set: { intensSold: [{ productId, quantity }] } });
};

// const deleteProduct = async (id) => {
//   const db = await connection();
//   console.log('model');
//   return db.collection('products').deleteOne({ _id: ObjectId(id) });
// };

module.exports = {
  getAllSales,
  createSale,
  // findProduct,
  getSaleById,
  updateSale,
  // deleteProduct,
};
