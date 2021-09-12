const connection = require('./connection');

// const getAllProducts = async () => {
//   const db = await connection();
//   return db.collection('products').find().toArray();
// };

const findProduct = async (name) => {
  console.log('find');
  const db = await connection();
  console.log('find2');
  return db.collection('products').findOne({ name });
};

const createProduct = async (product) => {
  const db = await connection();
  return db.collection('products').insertOne(product);
};

module.exports = {
  // getAllProducts,
  createProduct,
  findProduct,
};
