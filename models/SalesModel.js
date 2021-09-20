// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addNewSale = async (array) =>
    connection()
        .then((db) => db.collection('sales').insertMany([...array]))
        .then((re) => ({
            _id: re.insertedIds['0'],
            itensSold: array.filter((r) => r),
        }));

module.exports = {
    addNewSale,
};
