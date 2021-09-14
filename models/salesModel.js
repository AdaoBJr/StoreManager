const connection = require('./mongoConnetion');

const COLLECTION = 'sales';

const createSale = async (array) => {
  const db = await connection();
  const create = await db.collection(COLLECTION).insertOne({ itensSold: array });
  // console.log(create);
  return create.ops[0];
};

module.exports = {
  createSale,
};