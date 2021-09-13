const { ObjectId } = require('mongodb');
const mongoConnection = require('./mongoConnection');

const create = async ({ name, quantity }) => {  
  const db = await mongoConnection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(newProduct);
  
  return { 
    _id: insertedId,
    name,
    quantity,
 };
};

const getAll = async () => {
  const db = await mongoConnection();
  const result = await db.collection('products').find().toArray();

  return {
    products: result,
  };
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await mongoConnection();
  const productId = await db.collection('products').findOne({ _id: ObjectId(id) });

  return productId;
};

const update = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;
  const newData = { name, quantity };  

  const db = await mongoConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: newData },    
  );
  return { 
    _id: id,
    name,
    quantity,
 };
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const db = await mongoConnection();
  const deletedProduct = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  
  return deletedProduct;
};

const findByName = async (name) => {  
  const query = { name };  
  const db = await mongoConnection();
  const productName = await db.collection('products').findOne(query);   
  
  return productName;
};

module.exports = {
  create,
  getAll,
  findById,
  update,
  exclude,
  findByName,
};
