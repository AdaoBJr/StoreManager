const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

// -----------------------------------------------------------------------------------------------

const createSale = async (sales) => {
  const db = await connection();
  const insertSales = await db.collection('sales').insertOne({ itensSold: sales });
  // o insertProduct.ops retorna inserção que acabamos de fazer
  return insertSales.ops[0];
};

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return { sales };
};

const getSaleById = async (id) => {
  try {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;  
  } catch (error) {
    rescue(error);
  }
};

const updateSale = async (id, sale) => {
  const { productId, quantity } = sale;
  const db = await connection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) },
    { $set: { itensSold: { productId, quantity } } },
  );
  const updatedSale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return updatedSale;
};

const deleteSale = async (id) => {
  const db = await connection();
  const deletedSale = await getSaleById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  const checkDelete = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return { deletedSale, checkDelete };
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};