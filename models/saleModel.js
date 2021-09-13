const { ObjectID, ObjectId } = require('mongodb');
const connection = require('./connection');
const Product = require('./productModel');

const getAllSales = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return sales;
};

const getSaleById = async (id) => {
  const sale = connection()
    .then((db) => db.collection('sales').findOne(new ObjectID(id)));

  return sale;
};

const insertSale = async (sale) => {
  sale.forEach(async (current) => {
    await Product.subProductQuantity(current.productId, current.quantity);
  });

  const insertedSale = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => result.ops[0]);

  return insertedSale;
};

const updateSale = async (id, itensSold) => {
  const updatedSale = { _id: ObjectId(id), itensSold };

  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    ));

  return updatedSale;
};

const deleteSale = async (id) => {
  const sale = await getSaleById(id);

  sale.itensSold.forEach(async (current) => {
    await Product.sumProductQuantity(current.productId, current.quantity);
  });

  await connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  updateSale,
  deleteSale,
};
