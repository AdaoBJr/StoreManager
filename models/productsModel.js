// const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const mongodb = require('./connection');

const registerNewProduct = async (newProduct) => {
  const { name } = newProduct;
  const connectedDB = await mongodb.getConnection()
  .then((db) => db.collection('products'));
  const isNotUnique = await connectedDB.find({ name }).toArray();
  if (isNotUnique.length > 0) {
    return { 
      err: { 
        message: 'Dados inválidos',
        code: 'Product already exists',
      },
    }; 
  }
  const { insertedId } = connectedDB.insertOne(newProduct);
  return { insertedId, ...newProduct };
};

const getProducts = async () => {
  const connectedDB = await mongodb.getConnection()
  .then((db) => db.collection('products'));
  const products = await connectedDB.find().toArray();
  return products;
};

const getProductById = async (id) => {
  const connectedDB = await mongodb.getConnection()
  .then((db) => db.collection('products'));
  const product = await connectedDB.find({ _id: ObjectId(id) }).toArray();
  if (product.length === 0) {
    return { 
      err: { 
        message: 'invalid_data',
        code: 'Wrong id format',
      },
    }; 
  }
  return product;
};

module.exports = {
  registerNewProduct,
  getProducts,
  getProductById,
};
