const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const createSale = async (itensSold) => {
  const sale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }));
  // console.log({ _id: sale.insertedId, itensSold });
  return { _id: sale.insertedId, itensSold };
};

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const saleData = await connection()
    .then((db) => db.collection('sales').findOne(new ObjectId(id)));
  // console.log(saleData);
  if (!saleData) return null;

  return saleData;
};

const updateSale = async (id, itemToUpdate) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  // Tive uma dúvida com a lógica e olhei o código da colega Mariana Savoldi
  await connection()
    .then((db) => db.collection('sales')
      .updateOne(
        { _id: ObjectId(id) }, { $set: { itensSold: itemToUpdate } },
      ));

  return { _id: id, itensSold: itemToUpdate };
};

module.exports = {
  createSale,
  findSaleById,
  getAllSales,
  updateSale,
};