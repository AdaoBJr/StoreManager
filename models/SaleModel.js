const { ObjectId } = require('mongodb');
const connection = require('./connection');
const ProductModel = require('./ProductModels');

async function create(salesInfo) {
  const db = await connection();

  const { name, quantity } = await ProductModel.findById(salesInfo[0].productId);

  if (quantity >= salesInfo[0].quantity) {
    const newQuantity = quantity - salesInfo[0].quantity;

    await ProductModel.update(salesInfo[0].productId, { name, quantity: newQuantity });

    const insert = await db.collection('sales').insertOne({ itensSold: salesInfo });

    return insert.ops[0];
  }

  return null;
}

async function getAll() {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();

  return { sales: result };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return result;
}

async function update(id, salesInfo) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const insert = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold: salesInfo } },
    { returnOriginal: false },
  );

  return insert.value;
}

async function exclude(id) {
  if (!ObjectId.isValid(id)) return null;

  const findSale = await findById(id);
  const { _id, name, quantity } = await ProductModel.findById(findSale.itensSold[0].productId);

  const newQuantity = quantity + findSale.itensSold[0].quantity;

  await ProductModel.update(_id, { name, quantity: newQuantity });

  const db = await connection();

  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return result;
}

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};
