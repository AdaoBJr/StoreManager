const connection = require('./mongoConnection');

const createNewProduct = async ({ name, quantity }) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(newProduct);
  return { _id: insertedId, name, quantity };
};

module.exports = {
  createNewProduct,
};