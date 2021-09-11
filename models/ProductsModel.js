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

const getOne = async (name) => {
  console.log(name, 'ALOOOOOOOOO');
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));
  const product = await productsCollection.findOne({ name });
  return product;
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const products = await db.collection('products').find().toArray();
  return products;
};

module.exports = {
  create,
  getOne,
  getAll,
};