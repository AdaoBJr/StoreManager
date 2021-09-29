const { ObjectID } = require('mongodb');
const mongoConnection = require('./connection');

const create = async (name, quantity) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection.insertOne({ name, quantity });

  return {
    _id: id,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const found = await productsCollection.findOne({ name });

  if (found) return found;
};

const findById = async (id) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const found = await productsCollection.findOne({ _id: ObjectID(id) });

  return found;
};

const getAllProducts = async () => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const allProducts = await productsCollection.find()
  .toArray();

  return {
    products: allProducts,
  };
};

const updateOne = async (id, name, quantity) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  await productsCollection.updateOne(
    { _id: ObjectID(id) },
    {
      $set: {
        name,
        quantity,
      },
    },
  );
  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const { deletedCount } = productsCollection.deleteOne({ _id: ObjectID(id) });

  return deletedCount;
};

module.exports = {
  create,
  findByName,
  getAllProducts,
  findById,
  updateOne,
  deleteProduct,
};
