const Connection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await Connection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

// const getAll = async () => {
//   const db = await Connection.getConnection();
//   const movies = await db.collection('movies')
//     .find()
//     .toArray();

//   return movies;
// };

module.exports = {
  create,
  // getAll,
}; 