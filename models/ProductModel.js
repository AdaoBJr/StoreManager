const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

    const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

    return {
      id,
      name,
      quantity,
    };
  };

const findByName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });

  return product;
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const products = await db.collection('products')
    .find()
    .toArray();

  return products;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  // https://mongodb.github.io/node-mongodb-native/api-bson-generated/objectid.html

  const db = await mongoConnection.getConnection();
  const products = await db.collection('products')
    .findOne({ _id: ObjectId(id) });

  if (!products) return null;

  return products;
};

const update = async (id, name, quantity) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

    await productsCollection
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return {
      _id: id,
      name,
      quantity,
    };
  };

  const deleteById = async (id) => {
    const productsCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('products'));
  
      await productsCollection
        .deleteOne({ _id: ObjectId(id) });
    };

module.exports = {
  create,
  update,
  deleteById,
  findByName,
  getAll,
  findById,
};