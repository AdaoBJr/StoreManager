const connection = require('./connection');

async function getAll() {
  const products = await connection().then((db) => db.collection('products').find().toArray());

  if (!products.length) {
    return { err: { code: 'not_found', message: 'Nenhum produto encontrado.' } };
  }
  
  const data = { products };
  
  return data;
}

async function create(name, quantity) {
  try {
    const newProduct = await connection()
      .then((db) => db.collection('products').insertOne({ name, quantity }))
      .then((result) => ({ _id: result.insertedId, name, quantity }));

      return newProduct;
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
}

module.exports = { create, getAll };
