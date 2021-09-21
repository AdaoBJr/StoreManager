const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const newProduct = async ({ name, quantity }) => {
    const db = await connection();
    const product = await db.collection('products').insertOne({ name, quantity });
    const { insertedId } = JSON.parse(product);
    return { _id: insertedId, name, quantity };
};

const productsList = async () => {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    return products;
};

const listById = async (id) => {
    const db = await connection();
    const product = await db.collection('products').findOne(ObjectId(id));
  
    if (product) {
      return { status: 200, product };
    }
    return {
      status: 422, err: { code: 'invalid_data', message: 'Wrong id format' } };
};

const updateProduct = async ({ id, name, quantity }) => {
    const db = await connection();
    const produto = await db.collection('products').updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } });
  
    return produto;
};

module.exports = { newProduct, productsList, listById, updateProduct };