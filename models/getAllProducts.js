const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const err = {
    code: 'invalid_data',
    message: 'Wrong id format',
};

const getAllProducts = async (req, res) => {
    const productsCollection = await getConnection()
    .then((db) => db.collection('products'));

    const products = await productsCollection.find({ name: { $exists: true } }).toArray();
        return res.status(200).json({ products });
};

const getProductsId = async (req, res) => {
    const productsCollection = await getConnection()
    .then((db) => db.collection('products'));
    const { id } = req.params;
    const result = ObjectId.isValid(id);
    if (!result) {
        return res.status(422).json({ err });
      }
    const product = await productsCollection.findOne({ _id: ObjectId(id) });
    return res.status(200).json(product);
};

module.exports = {
    getAllProducts,
    getProductsId,
};
