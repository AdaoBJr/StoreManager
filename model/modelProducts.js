const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const deleteProduct = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  
  const products = await getConnection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const product = getConnection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  return product;
};

const getAll = async () => getConnection()
    .then((db) => db.collection('products').find().toArray());

const create = async ({ name, quantity }) => {
  const db = await getConnection();

  const product = await db.collection('products').insertOne({ name, quantity });
  return product;
};

// reduz stock de produtos
const decProducts = async (id, decQuantity) => {
  const db = await getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $inc: {
      quantity: (decQuantity * -1),
    } },
  );
};

// aumenta stock de produtos
const incProducts = async (id, incQuantity) => {
  const db = await getConnection();
  await db.collection('producst').updateOne(
    { _id: ObjectId(id) },
    { $inc: {
      quantity: incQuantity,
    } },
  );
};

module.exports = { 
  create,
  getAll,
  findById,
  deleteProduct,
  decProducts,
  incProducts,
};
