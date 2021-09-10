const mongoConnection = require('./connection');

const findByName = async (name) => {
 const res = await mongoConnection()
 .then((db) => db.collection('products')
 .findOne({ name })).then((response) => response);
 return res;
};

const createProduct = async (name, quantity) => {
const { insertedId: id } = await mongoConnection()
.then((db) => db.collection('products')
.insertOne({ name, quantity }));
  return {
    _id: id,
    name,
    quantity,
  };
};

module.exports = {
  findByName,
  createProduct,
};