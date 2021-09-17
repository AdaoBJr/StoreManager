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

const updatesalesModel = async (itensSold, id) => {
  if (!ObjectId.isValid(id)) { return 422; }
  connection().then((DB) => DB.collection('sales').updateOne({ _id: ObjectId(id) }, 
    { $set: { itensSold } }));
  return connection()
  .then((DB) => DB.collection('sales').findOne(ObjectId(id)));
};

const deleteSalesModel = async (id) => {
  if (!ObjectId.isValid(id)) { return 422; }
  const item = connection().then((DB) => DB.collection('sales').findOne(ObjectId(id)));
  connection().then((DB) => DB.collection('sales')
    .deleteOne({ _id: ObjectId(id) })); 
  return item;
};

module.exports = {
  createSalesModel,
  showAllsalesModel,
  showByIdsalesModel,
  updatesalesModel,
  deleteSalesModel,
};