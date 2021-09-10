const { ObjectId } = require('mongodb');
const connection = require('./connection');
const { updateProdQuantity } = require('./productModel');

const createSaleData = async (bodySales) => {
  bodySales.forEach(async (el) => {
    await updateProdQuantity(el.productId, el.quantity, 'decrease');
  });

  const { insertedId } = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: bodySales }));

  return {
    _id: insertedId,
    itensSold: bodySales,
  };
};

const getAllSalesData = async () => {
  const allSales = await connection()
    .then((db) => db.collection('sales').find().toArray());

  return {
    sales: allSales,
  };
};

const findById = async (id) => {
  const sale = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)))
    .then((result) => result);

  return sale;
};
