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
  if (!ObjectId.isValid(id)) return false;

  const venda = await db.collection('sales').findOne(ObjectId(id));
  return { status: 200, venda };
};

const deleteSale = async ({ id }) => {
  const db = await connection();
  const venda = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return venda;
};

const updateSale = async ({ id, productId, quantity }) => {
  const db = await connection();

  const xablau = await listById(id);
  if (xablau.err) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  }
  const { venda: { itensSold } } = xablau;

  itensSold.forEach((item, index) => {
    if (item.productId === productId) {
      itensSold[index].quantity = quantity;
    }
  });

  await db.collection('sales').updateOne({ _id: ObjectId(id) },
    { $set: { itensSold } });

  return { _id: ObjectId(id), itensSold };
};

module.exports = { newSales, listSales, listById, updateSale, deleteSale };
