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
        code: 'invalid_data',
        message: 'Product already exists',
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
  return { products };
};

const getProductById = async (id) => {
  const connectedDB = await mongodb.getConnection()
  .then((db) => db.collection('products'));
  try {
    const product = await connectedDB.find({ _id: ObjectId(id) }).toArray();
    if (product.length === 0) {
      return { 
        err: { 
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      }; 
    }
    return product[0];
  } catch (err) {
    return { err: { code: 'invalid_data', message: 'Wrong id format' },
    };
  }
};

module.exports = {
  registerNewProduct,
  getProducts,
  getProductById,
};
