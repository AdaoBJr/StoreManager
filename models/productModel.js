const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect.connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;  
};

const getById = async ({ id }) => {
  const db = await connect.connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  if (!product) {
    return false;
  }
  return product;
};

const productExists = async ({ name }) => {
  const db = await connect.connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const create = async ({ name, quantity }) => {
  const db = await connect.connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  const db = await connect.connection();
  const product = await 
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return {
      _id: product.insertedId,
      name,
      quantity,
    };
};

const deleteProduct = async ({ id, name, quantity }) => {
  const db = await connect.connection();
  const product = await 
    db.collection('products').deleteOne({ _id: ObjectId(id) });
    return {
      _id: product.insertedId,
      name,
      quantity,
    };
};

module.exports = {
  getAll, 
  getById,
  productExists,
  create,
  update,
  deleteProduct,
};