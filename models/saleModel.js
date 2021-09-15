const connect = require('./connection');

const getAll = async () => {
  const db = await connect.connection();
  const allProducts = await db.collection('sales').find().toArray();
  return allProducts;  
};

const create = async (itensSold) => {
  const db = await connect.connection();
  const sale = await db.collection('sales').insertOne({ itensSold });
  return {
    productId: sale.insertedId,
    itensSold,
  };
};

module.exports = {
  getAll,
  create,
};
