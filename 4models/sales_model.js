const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSalesModel = async (sale) => {
  const DB = await connection();
  const a = { itensSold: sale };
  const products = await DB.collection('sales').insertOne(a);
  return products.ops[0];
};

const showAllsalesModel = async () => connection()
  .then((DB) => DB.collection('sales').find().toArray());

const showByIdsalesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const DB = await connection();
  return DB.collection('sales').findOne(ObjectId(id));
};

module.exports = {
  createSalesModel,
  showAllsalesModel,
  showByIdsalesModel,
};