const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, quantity) => {
  const DB = await connection();
  const products = await DB.collection('products').insertOne({ name, quantity });
  return products.ops[0];
};

const getAll = async () => connection()
      .then((DB) => DB.collection('products').find().toArray());

const findByName = async (name) => connection()
.then((DB) => DB.collection('products').findOne({ name }));

const findByID = async (id) => {
  if (!ObjectId.isValid(id)) { return 422; }
  return connection()
    .then((DB) => DB.collection('products').findOne(new ObjectId(id))); 
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) { return 422; }
  connection()
    .then((DB) => DB.collection('products')
    .updateOne({ _id: ObjectId(id) }, 
      { $set: { name, quantity } }));
  return connection()
    .then((DB) => DB.collection('products').findOne(new ObjectId(id)));
};

const deleteItem = async (id) => {
  if (!ObjectId.isValid(id)) { return 422; }
  const item = connection().then((DB) => DB.collection('products').findOne(new ObjectId(id)));
  connection().then((DB) => DB.collection('products')
    .deleteOne({ _id: ObjectId(id) })); 
  return item;
};

module.exports = {
  create,
  getAll,
  findByName,
  findByID,
  update,
  deleteItem,
};
