const { ObjectId } = require('mongodb');
const { getConnection } = require('../../config/mongoConnection');
const productsModel = require('./productsModel');

const newSale = async (sale) => {
  const db = await getConnection();
  const { insertedId: _id } = await db.collection('sales').insertOne({ itensSold: sale });
  return { _id, itensSold: sale };
};

const allSales = async () => {
  const db = await getConnection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sale;
};

const update = async (_id, salesData) => {
  if (!ObjectId.isValid(_id)) return null;
  const db = await getConnection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(_id) }, { $set: { itensSold: salesData } },
    );
  return { _id, itensSold: salesData };
};

const updStockUp = async (id) => {
  const { itensSold } = await getSaleById(id);
  itensSold.forEach(async ({ productId, quantity }) => {
    const product = await productsModel.getProductById(productId);
    const newQuantity = product.quantity + quantity;
    // console.log(product.quantity + ' + ' + quantity);
    await productsModel.update(productId, product.name, newQuantity);
  });
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await getConnection();
  await updStockUp(id);
  return db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  newSale,
  allSales,
  getSaleById,
  update,
  exclude,
};