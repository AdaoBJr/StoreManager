const { ObjectId } = require('mongodb');
const connection = require('./connection');

const verifyIsAlreadyExists = async (name) =>
     connection()
        .then((db) => db.collection('products').findOne({ name }))
        .then((result) => {
            if (result) {
                return true;
            }
            return false;
        });

const addNewProduct = async (name, quantity) => 
    connection()
        .then((db) => db.collection('products').insertOne({ name, quantity }))
        .then((result) => ({ _id: result.insertedId, name, quantity }));

const getAllProducts = async () =>
    connection()
        .then((db) => db.collection('products').find().toArray())
        .then((result) => result);

const getProductById = (id) =>
    connection()
        .then((db) => db.collection('products').findOne(ObjectId(id)))
        .then((result) => result);

module.exports = {
    addNewProduct,
    verifyIsAlreadyExists,
    getAllProducts,
    getProductById,
};
