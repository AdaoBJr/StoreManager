// const { ObjectId } = require('mongodb');

const connection = require('./connection');

const registerNewSales = async (sales) => {
  try {
    const addedSales = await connection()
      .then((db) => db.collection('sales').insertOne({ itensSold: sales }))
      .then((result) => ({
          _id: result.insertedId,
          itensSold: sales,
      }));
    return addedSales;
  } catch (error) {
    return {
      message: error,
    };
  }
};

module.exports = {
  registerNewSales,
};
