const connection = require('./connection');

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const produto = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(produto);
  return { _id: insertedId, name, quantity };
};

module.exports = { newProduct };
