// const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const findByName = async (name) => {
  const productCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));
  
  return productCollection;  
};

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const createdProduct = await productsCollection.insertOne({ name, quantity });
  // const { insertedId: id } = createdProduct;
  return {
    id: createdProduct.insertedId,
    name,
    quantity,
  };
};

// const getAll = async () => {
//   const db = await mongoConnection.getConnection();
//   const movies = await db.collection('movies')
//     .find()
//     .toArray();

//   return movies
// };

module.exports = {
  create,
  findByName,
  /* getAll   */
};