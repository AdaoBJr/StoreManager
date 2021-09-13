const connection = require('./connection');

const findByName = async (name) => {
  const people = await connection().then((db) => db.collection('products'));

  const find = await people.findOne({ name });
  return find;
};

const create = async ({ name, quantity }) => {
  const data = await connection().then((db) => db.collection('products'));
  
  const newProduct = await data.insertOne({ name, quantity });
  return newProduct;
};

module.exports = {
  create,
  findByName,
};