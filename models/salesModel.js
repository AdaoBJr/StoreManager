const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSales = async (sales) => {
  const db = await connection();

  const createdSaleResult = await db
    .collection('sales')
    .insertOne({ itensSold: sales });

  sales.map(async (sale) => {
    const product = await db
      .collection('products')
      .findOne({ _id: ObjectId(sale.id) });
    const { _id, name, quantity } = product;

    const newQuantity = quantity - sale.quantity;

    if (newQuantity < 0) {
      throw new Error();
    }

    await db
      .collection('products')
      .updateOne({ _id: ObjectId(_id) }, { $set: { name, newQuantity } });
  });

  return { _id: createdSaleResult.insertedId, itensSold: sales };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getOne = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  if (result === null) {
    throw new Error();
  }

  return result;
};

const updateSaleById = async (sale, id) => {
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } }));

  return { _id: id, itensSold: sale };
};

const deleteSaleById = async (id) => {
  const result = await connection().then((db) =>
    db.collection('sales').findOne({ _id: ObjectId(id) }));

  result.itensSold.map(async (sale) => {
    const db = await connection();
    const product = await db
      .collection('products')
      .findOne({ _id: ObjectId(sale.id) });
    const newQuantity = product.quantity + sale.quantity;

    if (newQuantity < 0) throw new Error();
    const { name } = product;

    await db
      .collection('products')
      .updateOne({ _id: ObjectId(sale.productId) }, { $set: { name, newQuantity } });
  });

  await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  if (!result) throw new Error();

  return result;
};

module.exports = {
  createSales,
  getAll,
  getOne,
  updateSaleById,
  deleteSaleById,
};
