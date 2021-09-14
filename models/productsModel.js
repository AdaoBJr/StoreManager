const getConnection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await getConnection();
  const product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(product);
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

module.exports = {
  createProduct,
};
