const connection = require('./connection');

const salesCollection = 'sales';

const createSales = async (soldItens) => {
    const newSale = await connection().then((db) =>
      db.collection(salesCollection).insertOne({ itensSold: soldItens }));
    return newSale.ops[0];  
};

module.exports = {
    createSales,
};