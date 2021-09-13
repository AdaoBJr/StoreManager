// const { ObjectId } = require('mongodb');
const Connection = require('./connection');
// const ProductModel = require('./ProductModel');

const createSale = async ({ productId, quantity }) => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));

    const { insertedId: id } = await salesCollection.insertOne({
      productId,
      quantity,
    });
           
    return {
      id,
      productId,
      quantity,
    };
  };

  const getAllSale = async () => {
    const salesCollection = await Connection.getConnection()
      .then((db) => db.collection('sales'));
   
    const sales = await salesCollection.find({}).toArray();
    return sales;
  };
    
module.exports = {
  createSale,
  getAllSale,
};
