const { ObjectId } = require('mongodb');
const connection = require('./connection');

const isExist = async ({ name }) => {
  const storeManager = await connection();
  const products = await storeManager.collection('products');
  const query = { name };
  
  const result = await products.findOne(query);
  return result;
};

const create = async ({ name, quantity }) => {
  const storeManager = await connection();
  const products = await storeManager.collection('products');

  const { insertedId: id } = await products.insertOne({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

const getAll = async () => {
  const storeManager = await connection();
  const products = await storeManager.collection('products');
  
  const result = await products.find().toArray();

  return result;
};

const getById = async ({ id }) => {
  const storeManager = await connection();
  const products = await storeManager.collection('products');

  const query = { _id: ObjectId(id) };

  const result = await products.findOne(query);

  return result;
};

const updateById = async ({ id, name, quantity }) => {
  const storeManager = await connection();
  const products = await storeManager.collection('products');

  const filterQuery = { _id: ObjectId(id) };
  const updateQuery = { $set: { name, quantity } };

  await products.findOneAndUpdate(filterQuery, updateQuery);

  return {
    id,
    name,
    quantity,
  };
};

const deleteById = async ({ id }) => {
  const storeManager = await connection();
  const products = await storeManager.collection('products');

  const query = { _id: new ObjectId(id) };

  const result = await products.findOneAndDelete(query);

  return result;
};

module.exports = {
  create,
  isExist,
  getAll,
  getById,
  updateById,
  deleteById,
};
