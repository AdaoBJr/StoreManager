const connection = require('./mongoConnetion');

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  if (!product) return null;

  return product;
};

const createProductModel = async ({ name, quantity }) => {
  const db = connection();
  const createResult = await db.collection('porducts').insertOne({ name, quantity });

  return { _id: createResult.insertedId, name, quantity };
};

module.exports = {
  findProductByName,
  createProductModel,
};
