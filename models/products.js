// models/products.js
const { getConnection } = require('./connection');

const err = {
    code: 'invalid_data',
    message: 'Product already exists',
};

const create = async (req, res) => {
    const productsCollection = await getConnection()
    .then((db) => db.collection('products'));
    const { name, quantity } = req.body;
    const product = await productsCollection.findOne({ name });
    if (product) return res.status(422).json({ err });

    const { insertedId: _id } = await productsCollection
    .insertOne({ name, quantity });
    return res.status(201).json({ _id, name, quantity });
};

module.exports = {
    create,
};
