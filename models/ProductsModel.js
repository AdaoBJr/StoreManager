const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const { insertedId: id } = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return {
    _id: id,
    name,
    quantity,
  };
};
const findByName = async (name) => {
  const findProduct = await connection().then((db) => db.collection('products').findOne({ name }));
  if (!findProduct) return null;
  return findProduct;
};

const getAllProducts = async () => {
  const findAllProduct = await connection().then((db) =>
    db.collection('products').find().toArray()).catch((err) => console.log(err));
  // const result = await findAllProduct.map(({ _id, name, quantity }) => ({
  //   id: _id,
  //   name,
  //   quantity,
  // }));
  return findAllProduct;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const findProduct = await connection().then((db) =>
  db.collection('products').findOne(new ObjectId(id)));

  if (!findProduct) return null;
  return findProduct;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  console.log(id);

const deleteData = await connection().then((db) =>
  db.collection('products').deleteOne({ _id: ObjectId(id) }));
  if (!deleteData) return null;
  return deleteData;
};

module.exports = {
  createProduct,
  findByName,
  getAllProducts,
  getProductById,
  deleteProduct,
};
