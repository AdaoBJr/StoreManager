const { ObjectId } = require('mongodb');
const mongoConnection = require('./mongoConnection');
const ProductModel = require('./productsModels');

const create = async (salesInfo) => {
  const db = await mongoConnection();

  const { name, quantity } = await ProductModel.findById(salesInfo[0].productId);

  if (quantity >= salesInfo[0].quantity) {
    const newQuantity = quantity - salesInfo[0].quantity;
    await ProductModel.update(salesInfo[0].productId, { name, quantity: newQuantity });

    const insert = await db.collection('sales').insertOne({ itensSold: salesInfo });

    return insert.ops[0];
  }

  return null;
};

const getAll = async () => {
  const db = await mongoConnection();
  const result = await db.collection('sales').find().toArray();

  return { sales: result };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection();
  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return result;
};

const update = async (id, salesInfo) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection();
  const insert = await db.collection('sales').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { itensSold: salesInfo } },
    { returnOriginal: false },
  );

  return insert.value;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const findSale = await findById(id);
  const { _id, name, quantity } = await ProductModel.findById(findSale.itensSold[0].productId);

  const newQuantity = quantity + findSale.itensSold[0].quantity;

  await ProductModel.update(_id, { name, quantity: newQuantity });

  const db = await mongoConnection();

  const result = await db.collection('sales').findOne({ _id: ObjectId(id) });
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return result;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
};