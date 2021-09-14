const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const updateQuantity = async (productId, quantity) => {
  const db = await mongoConnection.getConnection();
  return db.collection('products')
  .findOneAndUpdate({ _id: ObjectId(productId) }, { $inc: { quantity } });
};

const createSale = async (body) => {
  let promises = [];
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').insertOne({ itensSold: body });
  for (let i = 0; i < body.length; i += 1) {
    const { productId, quantity } = body[i];
    const x = -quantity;
    promises = [...promises, updateQuantity(productId, x)];
  }
   await Promise.all(promises);
  return {
    _id: sales.insertedId,
    itensSold: body,
  };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales').findOne({ _id: ObjectId(id) });
  return sales;
};

const getSales = async () => {
  const db = await mongoConnection.getConnection();
  const sales = await db.collection('sales')
    .find()
    .toArray();
    return { sales };
};

const updateSaleId = async (id, body) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  await db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { itensSold: body } });
  return {
    _id: id,
    itensSold: body,
  }; 
};

const deleteSaleId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const { itensSold } = await getSaleById(id);
  const body = itensSold;
  const db = await mongoConnection.getConnection();
  let promises = [];
  for (let i = 0; i < body.length; i += 1) {
    const { productId, quantity } = body[i];
    promises = [...promises, updateQuantity(productId, quantity)];
  }
  await Promise.all(promises);
  const deleteSale = await db.collection('sales')
  .findOneAndDelete({ _id: ObjectId(id) });
  return deleteSale.value;
};

module.exports = { 
  createSale,
  getSaleById,
  getSales,
  updateSaleId,
  deleteSaleId,
 };
