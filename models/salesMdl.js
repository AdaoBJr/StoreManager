const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (sales) => {
  const db = await connection();
  const newSale = await db.collection('sales')
    .insertOne(
      { itensSold: sales },
    );
  return newSale.ops[0];
};

const getSales = async () => {
  const db = await connection();

  return db.collection('sales')
    .find()
    .toArray();
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales')
    .findOne(ObjectId(id));

  return sale;
};

const idValid = async (id) => ObjectId.isValid(id);

const saleAlreadyExists = async (id) => {
  const db = await connection();
  const repeatedSale = await db.collection('sales')
    .findOne(
      { _id: ObjectId(id) },
    );
  return repeatedSale !== null;
};

const changeSale = async (id, sale) => {
  const db = await connection();
  await db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: sale } },
  );
  return { _id: id, itensSold: sale };
};

const deleteSale = async (id) => {
  const db = await connection();
  const { value } = await db.collection('sales')
    .findOneAndDelete(
      { _id: ObjectId(id) },
    );
  return value;
};
 
module.exports = {
  addSale,
  getSales,
  getSaleById,
  saleAlreadyExists,
  idValid,
  changeSale,
  deleteSale,
};
