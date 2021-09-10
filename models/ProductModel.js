// { "name": "Produto Silva", "quantity": 10 }

const connection = require('./connection');

const create = async (name, quantity) => {
  const db = await connection();
  const productAdd = await db
    .collection('products')
    .insertOne({ name, quantity });

  return productAdd.ops[0];
};

module.exports = { create };
