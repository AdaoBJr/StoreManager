const connection = require('./connection');

const isExist = async ({ name }) => {
  const productsCollection = await connection();
  const products = await productsCollection.collection('products');
  const query = { name };
  
  const result = await products.findOne(query);
  return result;
};

const create = async ({ name, quantity }) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

module.exports = {
  create,
  isExist,
};
