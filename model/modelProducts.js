const getConnection = require('./connection');

// const findByName = async (name) => {
//   const product = getConnection()
//     .then((db) => db.collection('products').findOne({ name }));

//   if (!product) return false;

//   return true;
// };

const getAll = async () => getConnection()
    .then((db) => db.collection('products').find().toArray());

const create = async ({ name, quantity }) => {
  const db = await getConnection();

  // insere produto no db
  const product = await db.collection('products').insertOne({ name, quantity });

  return product;
};

module.exports = { create, getAll };
