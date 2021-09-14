const { ObjectId } = require('mongodb');
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
    const salesCollection = await Connection.getConnection();
    const sales = await salesCollection('sales').find().toArray();
    return sales;
  };

  const getSaleById = async (id) => {
    if (!ObjectId.isValid(id)) {
      return null;
    }
    const salesCollection = await Connection.getConnection();
    const sale = await salesCollection('sales').findOne({ _id: ObjectId(id) });
    return sale;
  };

module.exports = {
  createSale,
  getAllProducts,
  getSaleById,
  };
