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

const checkSalesId = async ({ id }) => {
    const data = await connection().then((db) => 
      db.collection(salesCollection).findOne({ id }));
    return data;
};

module.exports = {
    createSales,
    getAllSales,
    getSalesById,
    checkSalesId,
};