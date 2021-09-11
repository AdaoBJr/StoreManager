// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const productsCollection = await connection();
  const products = await productsCollection.collection('sales');

  const query = { itensSold };

  const { insertedId: id } = await products.insertOne(query);

  return {
    id,
  };
};

module.exports = {
  create,
};
