const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getConnectionWithProductsCollection = async () => {
  const connectionWithProductCollections = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  return connectionWithProductCollections;
};

const create = async ({ name, quantity }) => {
  const productCollections = await getConnectionWithProductsCollection();

  const { insertedId: _id } = await productCollections
    .insertOne({ name, quantity });

  return {
    _id,
    name,
    quantity,
  };
};

const findName = async ({ name }) => {
 const productCollections = await getConnectionWithProductsCollection();

  const product = await productCollections.findOne({ name });

  return product;
};

const findAll = async () => {
  const productCollections = await getConnectionWithProductsCollection();

  const products = await productCollections.find().toArray();

  return products;
};

const findById = async ({ id }) => {
  const productCollections = await getConnectionWithProductsCollection();

  const product = await productCollections.findOne(new ObjectId(id));

  return product;
};

const updateById = async ({ id, name, quantity }) => {
  const productCollections = await getConnectionWithProductsCollection();

  const { result } = await productCollections.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    { upsert: false },
  );

  if (result.nModified > 0) {
    return { _id: id, name, quantity };
  }

  return { id, message: 'product not update' };
};

module.exports = { create, findName, findAll, findById, updateById };