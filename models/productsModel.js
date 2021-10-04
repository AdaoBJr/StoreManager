const { ObjectId } = require('mongodb');

const connection = './connection';

const createProduct = async ({ name, quantity }) => connection
.getConnection()
.then((db) => db.collection('products').insertOne({ name, quantity }))
.then((result) => result.ops[0]);

const getAllProducts = async () => {
    const productsCollection = await connection.getConnection()
    .then((db) => db.collection('products'));

    const listOfProducts = await productsCollection.find().toArray();

    return {
        products: listOfProducts,
    };
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }
    return connection.getConnection()
    .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

const findByName = async (name) => {
    const product = await connection.getConnection()
    .then((db) => db.collection('products').findOne({ name }));

    return product !== null;
};

module.exports = {
    createProduct,
    getAllProducts,
    findById,
    findByName,
};
