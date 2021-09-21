const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function save(itensSold) {
  const salesCol = await connection().then((db) => db.collection('sales'));

  const { insertedId } = await salesCol.insertOne(
    { itensSold },
  );
  return { _id: insertedId, itensSold };
}

async function findById(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const collection = await connection().then((db) => db.collection('sales'));
  const salesData = await collection.findOne(new ObjectId(id));

  if (!salesData) return null;

  return salesData;
}

async function list() {
  const collection = await connection().then((db) => db.collection('sales'));
  const sales = collection.find({}).toArray();
  
  return sales;
}

async function edit(id, itensSold) {
  const collection = await connection().then((db) => db.collection('sales'));
  const editId = new ObjectId(id);
  const { value } = await collection.findOneAndUpdate(
    { _id: editId },
    { $set: { itensSold } },
    { returnDocument: 'after' },
  );
  return value;
}

async function remove(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const userId = new ObjectId(id);
  const collection = await connection().then((db) => db.collection('sales'));
  const product = await collection.findOneAndDelete({ _id: userId });
  if (!product) return null;

  const { value } = product;
  return value;
}

module.exports = {
  save,
  findById,
  list,
  edit,
  remove,
};