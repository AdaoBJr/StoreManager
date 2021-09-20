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
        .then((db) => db.collection('products').find().toArray());
        // .then((result) => result);

const getProductById = async (id) =>
    connection()
        .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));

const updateProduct = async (id, name, quantity) => {
    connection()
        .then((db) => db.collection('products')
            .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
        .then((re) => re);
};

const deleteProduct = async (id) =>
    connection()
        .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectId(id) }))
        .then((re) => re.value);

module.exports = {
    addNewProduct,
    verifyIsAlreadyExists,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
