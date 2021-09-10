const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productsCollection = 'products';

const createProduct = async ({ name, quantity }) => {
    const newProduct = await connection().then((db) => {
        db.collection(productsCollection).insertOne({ name, quantity });
    });
    return newProduct.ops[0];
};

const getAllProducts = async () => {
    const allProducts = await connection().then((db) => {
        db.collection(productsCollection).find().toArray();
    });
    return {
        products: allProducts,
    };
};

const getProductById = async (id) => {
    const product = await connection().then((db) => {
        db.collection(productsCollection).findOne(new ObjectId(id));
    });
    return product;
};

const upDateProduct = async ({ name, quantity, id }) => {
    const productUpdated = await connection().then((db) => {
        db.collection(productsCollection).updateOne(
            { _id: ObjectId(id) },
            { $set: { name, quantity } },
        );
    });
    return productUpdated;
};

const deleteProductById = async (id) => {
    const productDeleted = await connection().then((db) => {
        db.collection(productsCollection).deleteOne(
            { _id: ObjectId(id) },
        );
    });
    if (productDeleted) return productDeleted;
};

module.exports = { 
    createProduct,
    getAllProducts,
    getProductById,
    upDateProduct,
    deleteProductById };