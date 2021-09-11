const { ObjectId } = require('mongodb');
const connection = require('./connection');

const salesCollection = 'sales';

const createSales = async (soldItens) => {
    const newSale = await connection().then((db) =>
      db.collection(salesCollection).insertOne({ itensSold: soldItens }));
    return newSale.ops[0];  
};

const getAllSales = async () => {
    const allSales = await connection().then((db) => 
      db.collection(salesCollection).find().toArray());
    return { sales: allSales };
};

const getSalesById = async (id) => {
    const sale = await connection().then((db) =>
      db.collection(salesCollection).findOne(ObjectId(id)));
    return sale;
};

const checkifSalesIDExist = async ({ id }) => {
    const data = await connection().then((db) => 
      db.collection(salesCollection).findOne({ id }));
    return data;
};

const updateSales = async ({ id, itensSold }) => {
    const updatedSale = await connection().then((db) => 
    db.collection(salesCollection).updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    ));
    if (updatedSale) return { _id: id, itensSold };
};

const deleteSaleById = async (id) => {
    const deletedSales = await connection().then((db) =>
      db.collection(salesCollection).deleteOne({
          _id: ObjectId(id),
      }));
    return deletedSales;
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
    checkifSalesIDExist,
    updateSales,
    deleteSaleById,
};