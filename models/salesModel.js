const connection = require('./connection');
const { ObjectId } = require('mongodb');
const productsModel = require('./productsModel');


const createSale = async (salesArray) => {
  const db = await connection();
  const result = await db.collection('sales').insertOne({'itensSold': salesArray});
  await productsModel.updateQuantityAfterCreate(result);
  return result;
};

const getAllSales = async () => {
  const db = await connection();
  const result = await db.collection('sales').find().toArray();
  return result;
};

const getSaleById = async (id) => {
  const db = await connection();
  const result = await db.collection('sales').findOne(new ObjectId(id));
  return result;
};

const updateSale = async (id, productId, quantity) => {
  const db = await connection();;
  await db.collection('sales')
    .updateOne(
      {_id: ObjectId(id)},
      {$set: { 'itensSold.$[element].quantity': quantity}},
      {arrayFilters: [ {'element.productId': productId}]}
    );
  const updatedSale = await getSaleById(id);
  return updatedSale;
};

const deleteSale = async (id) => {
  const db = await connection();
  const deletedData = await getSaleById(id);
  await db.collection('sales').deleteOne({_id: ObjectId(id)});
  await productsModel.updateQuantityAfterDelete(deletedData);
  return deletedData;
};


module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};