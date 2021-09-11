const connection = require('./connection');

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
};

/*

_id: 3472839nr982389ufcvm2,
obj: {
  name, qut
}

*/