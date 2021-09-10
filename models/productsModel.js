// const rescue = require('express-rescue');
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

module.exports = {
  registerNewProduct,
};
