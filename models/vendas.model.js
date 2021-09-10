const { ObjectId } = require('mongodb');
const connection = require('./mongoConnection');

const newSales = async (result) => {
  const db = await connection();
  const venda = await db.collection('sales').insertOne({ itensSold: result });
  const { insertedId } = venda;
  const xablau = JSON.parse(venda);
  return { _id: insertedId, itensSold: xablau.ops[0].itensSold };
};

const listSales = async () => {
  const db = await connection();
  const venda = await db.collection('sales').find().toArray();
  return venda;
};

const listById = async (id) => {
  const db = await connection();
  const venda = await db.collection('sales').findOne(ObjectId(id));

  if (venda) {
    return { status: 200, venda };
  }
  return {
    status: 404, err: { code: 'not_found', message: 'Sale not found' } };
};

const updateSale = async ({ id, productId, quantity }) => {
  const db = await connection();
  const venda = await db.collection('sales').updateOne({ _id: ObjectId(id) },
    { $set: { itensSold: [{ productId, quantity }] } });

  return { _id: ObjectId(id), itensSold: venda.ops[0].itensSold };
};

module.exports = { newSales, listSales, listById, updateSale };
