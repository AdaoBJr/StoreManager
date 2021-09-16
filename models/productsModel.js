const { ObjectId } = require('mongodb'); 
const connect = require('./connection');

require('dotenv').config();

const findAllProducts = async () => {
  const conect = await connect();
  const db = await conect.collection(process.env.COLLECTION).find().toArray();
  return db;
};

const findById = async (id) => {
  const conect = await connect();
  const db = await conect.collection(process.env.COLLECTION).findOne(ObjectId(id));
  return db;
};

const findProduct = async (name) => {
  const conect = await connect();
  const db = await conect.collection(process.env.COLLECTION).findOne({ name });
  return db;
};

const addProduct = async (name, quantity) => {
  const conect = await connect();
  const db = await conect.collection(process.env.COLLECTION).insertOne({ name, quantity });
  return db;
};

module.exports = {
  addProduct,
  findProduct,
  findAllProducts,
  findById,
};