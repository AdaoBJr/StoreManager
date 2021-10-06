const connection = require('./connection');

const create = async (productArray) => {
  const db = await connection();
  const product = await db.collection('sales')
    .insertOne({ itensSold: productArray });
    return { _id: product.insertedId, itensSold: productArray };
};

const productsExist = async (productArray) => {
  const db = await connection();
  await db.collection('products')
    .find({ _id: { $in: productArray } }).toArray();
};

module.exports = {
  create,
  productsExist,
};
