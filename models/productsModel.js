const connection = require('./connection');

const findByName = async (name) => { 
  const find = await connection().then((db) => db.collection('products').findOne({ name }));
  return find;
};
const addProducts = async (name, quantity) => {
  const add = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return add;
};

module.exports = {
    findByName,
    addProducts,
};