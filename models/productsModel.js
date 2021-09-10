const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const createdProduct = await productsCollection.insertOne({ name, quantity });
  const { insertedId: id } = createdProduct;

  return {
    id,
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
  /* getAll   */
};