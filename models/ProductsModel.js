const connection = require('./connection');

async function getAll() {
  const products = await connection().then((db) => db.collection('products').find().toArray());

  if (!products.length) {
    const newError = {
      error: { code: 'notFound', message: 'Nenhum produto encontrado.' },
    };

    return newError;
  }

  const data = { products };
  
  return data;
}

module.exports = { getAll };