const { ObjectId } = require('mongodb');

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

const getAllSales = async () => {
  try {
    const allSales = await connection()
      .then((db) => db.collection('sales').find().toArray())
      .then((result) => result);
    return allSales;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const getSaleById = async (id) => {
  try {
    const sale = await connection()
      .then((db) => db.collection('sales').findOne(ObjectId(id)))
      .then((result) => result);
    return sale;
  } catch (error) {
    return {
      message: error,
    };
  }
};

const updateSales = async (id, updatedItensSold) => {
  try {
    const updatedSales = await connection()
      .then((db) => db.collection('sales')
        .update({ _id: ObjectId(id) }, { itensSold: updatedItensSold }))
      .then(() => ({
          _id: id,
          itensSold: updatedItensSold,
        }));
    return updatedSales;
  } catch (error) {
    return {
      message: error,
    };
  }
};

module.exports = {
  registerNewSales,
  getAllSales,
  getSaleById,
  updateSales,
};
