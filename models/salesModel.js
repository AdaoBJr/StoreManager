const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (newSale) => {
  const db = await connection.getConnection();
  const createSaleResult = await db.collection('sales').insertOne({ itensSold: newSale });

  return { _id: createSaleResult.insertedId, itensSold: newSale };
};

const getAllSales = async () => {
  const db = await connection.getConnection();
  const sales = await db.collection('sales').find().toArray();

  return { sales };
};

const getSalesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection.getConnection();
  const getByIdResult = await db.collection('sales').find({ _id: ObjectId(id) }).toArray();

  return getByIdResult;
};

const updateSale = async (id, update) => {
  const db = await connection.getConnection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: update } },
  );
  const saleUpdated = await getSalesById(id);
  return saleUpdated[0];
};

const deleteSale = async (id) => {
  const db = await connection.getConnection();
  const deletedProduct = await getSalesById(id);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deletedProduct;
};

module.exports = { 
  addSale,
  getAllSales,
  getSalesById,
  updateSale,
  deleteSale,
 };