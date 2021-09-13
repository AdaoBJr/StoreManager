const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();

  return db.collection('products').find().toArray();
};

const newProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(product);
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const productExists = async (name) => {
  const db = await connection();
  let product = null;

  product = await db.collection('products').findOne({ name });  

  if (product) {
    return true;
  }
};

module.exports = {
  newProduct,
  productExists,
  getAllProducts,
};
