const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function findItem(product) {
  const { name } = product;
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function save({ name, quantity }) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
}

async function list() {
  const db = await connection();
  const results = await db.collection('products').find();
  return {
    products: await results.toArray(),
  };
}

async function listById(id) {
  const products = await connection().then((db) => db.collection('products'));
  const result = await products.findOne({ _id: ObjectId(id) });
  return result;
}

async function edit(id, item) {
  const { name, quantity } = item;
  const collection = await connection().then((db) => db.collection('products'));
  
  const editedProduct = await collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
    );
    
    return editedProduct;
  }
  
  async function remove(id) {
  const collection = await connection().then((db) => db.collection('products'));
  const deleteProduct = await collection.deleteOne({ _id: ObjectId(id) });
  
  return deleteProduct;
}

function buildFilterByop(op, productId, quantity) {
  switch (op) {
    case 'decrease':
      return { $and: [{ _id: ObjectId(productId) }, { $expr: { $lt: [quantity, '$quantity'] } }] };
    default:
      return { $and: [{ _id: ObjectId(productId) }] };
  }
}

async function editQt(op, items) {
  if (op !== 'decrease' && op !== 'increase') {
    return null;
  }

  const db = await connection();

  const updateQuantityPromises = items.map(({ productId, quantity }) => {
    const incQuantity = (op === 'decrease') ? { quantity: -quantity } : { quantity };

    return db.collection('products').findOneAndUpdate(
      buildFilterByop(op, productId, quantity),
      { $inc: incQuantity },
      { returnDocument: 'after' },
    );
  });

  const promiseResults = await Promise.all(updateQuantityPromises);
  return promiseResults.every(({ value }) => value);
}

module.exports = {
  save,
  findItem,
  list,
  listById,
  edit,
  remove,
  editQt,
};
