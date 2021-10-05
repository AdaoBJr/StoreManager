const { ObjectId } = require('mongodb');
const connection = require('../../config/mongoConnection');

const newProduct = async (name, quantity) => {
    const db = await connection();
    const product = await db.collection('products').insertOne({ name, quantity });
    return { _id: product.insertedId, name, quantity };
};

const getProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return product;
};

const getAllProducts = async () => {
  const db = await connection();
  const characters = db.collection('products').find().toArray();
 
  return characters;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
    );
  return { id, name, quantity };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  
  return db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getProductByName,
  getAllProducts,
  getProductById,
  newProduct,
  update,
  exclude,
};
