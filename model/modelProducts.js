const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

// const deleteProduct = async (id) => {
//   if (!ObjectId.isValid(id)) return null;

//   getConnection().then((db) => db.collection('products').deleteOne(new ObjectId(id)));

//   return true;
// };

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const product = getConnection()
  .then((db) => db.collection('products').findOne(new ObjectId(id)));
  return product;
};

const getAll = async () => getConnection()
    .then((db) => db.collection('products').find().toArray());

const create = async ({ name, quantity }) => {
  const db = await getConnection();

  // insere produto no db
  const product = await db.collection('products').insertOne({ name, quantity });

  return product;
};

module.exports = { create, getAll, findById };
