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

const updateProduct = async (id, name, quantity) =>
    connection()
        .then((db) => db.collection('products')
            .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
        .then((re) => re);

const updateQuantityBeforeDeleteSale = async (sale) =>
    connection()
        .then((db) => db.collection('products')
            .updateOne({ _id: ObjectId(sale.productId) }, { $inc: { quantity: -sale.quantity } }));
        
const updateQuantityAfterDeleteSale = async (sale) =>
    connection()
        .then((db) => db.collection('products')
            .updateOne({ _id: ObjectId(sale.productId) }, { $inc: { quantity: +sale.quantity } }));
        
const validateStockBeforeSell = async (objeto) =>
        connection()
            .then((db) => db.collection('products')
                .findOne({ $and: [
                    { _id: ObjectId(objeto.productId) },
                    { quantity: { $gte: objeto.quantity } },
                ] }))
                .then((re) => {
                    if (re) {
                        return true;
                    }
                    return false;
                });

// Aprendi a usar o findOneAndDelete aqui:https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/
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
    updateQuantityBeforeDeleteSale,
    updateQuantityAfterDeleteSale,
    validateStockBeforeSell,
};
