const connection = require('./connection');

const verifyIsAlreadyExists = async (name) =>
     connection()
        .then((db) => db.collection('products').findOne({ name }))
        .then((result) => {
            if (result) {
                return true;
            }
            console.log(result);
            return false;
        });

const addNewProduct = async (name, quantity) => 
    connection()
        .then((db) => db.collection('products').insertOne({ name, quantity }))
        .then((result) => ({ _id: result.insertedId, name, quantity }));

module.exports = {
    addNewProduct,
    verifyIsAlreadyExists,
};
