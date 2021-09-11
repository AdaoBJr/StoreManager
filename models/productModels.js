const connection = require('./connection');

async function findProduct(product) {
  const { name } = product;
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function saveProduct({ name, quantity }) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: result.insertedId,
    name,
    quantity,
  };
}

module.exports = {
  saveProduct,
  findProduct,
};

/*

_id: 3472839nr982389ufcvm2,
obj: {
  name, qut
}

*/