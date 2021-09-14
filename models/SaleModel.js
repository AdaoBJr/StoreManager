// const { ObjectId } = require('mongodb');
const Connection = require('./connection');
// const ProductModel = require('./ProductModel');

const createSale = async (body) => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));

    const { insertedId: id } = await salesCollection.insertOne({
      itensSold: [...body],      
    });
            
    return {
      _id: id,
      itensSold: [...body],
    };
  };

  const getAllProducts = async () => {
    const salesCollection = await Connection.getConnection()
    const sales = await salesCollection('sales').find().toArray();
    return sales;

module.exports = {
  createSale,
  };
