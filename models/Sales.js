const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSalesList = async () => {
  const db = await connection();

  return db.collection('sales').find().toArray();
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();

  return db.collection('sales').findOne(ObjectId(id));
};

// const createSales = async (name, quantity) => {

//   const db = await connection();

//   const newSales = await db.collection('sales').insertMany

// };

// const isProductValid = async (...name) => {
//   const productsName = [...name];

//   const db = await connection();

//   const products = await db.collection('products').find({ name: { $in: [...name] } });

//   if (!products || products.length !== productsName.length) {
//     return null;
//   }

//   return products;
// };

module.exports = {
  getAllSalesList,
  getSaleById,
};
