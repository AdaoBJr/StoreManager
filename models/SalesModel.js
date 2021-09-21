const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addNewSale = async (objeto) =>
    connection()
        .then((db) => db.collection('sales').insertOne(objeto))
        .then((re) => ({
            _id: re.insertedId,
            itensSold: re.ops[0].itensSold,
        }));

const getAllSales = async () =>
        connection()
            .then((db) => db.collection('sales').find().toArray())
            .then((re) => ({
                sales: re,
            }));

const getSaleById = async (id) =>
            connection()
                .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const updateSale = async (id, array) =>
            connection()
                .then((db) => db.collection('sales')
                    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: array } }))
                    .then((re) => re);

module.exports = {
    addNewSale,
    getAllSales,
    getSaleById,
    updateSale,
};
