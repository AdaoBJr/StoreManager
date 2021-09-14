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
    return product;
};

const productId = async (req, res) => {
    const product = await getProductsId(req, res);
    return res.status(200).json(product);
};

const updateProducts = async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const db = await getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
    const product = await getProductsId(req, res);
    return res.status(200).json(product);
};

const deleteProductsId = async (req, res) => {
    const { id } = req.params;
    const db = await getConnection();
    const product = await getProductsId(req, res);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
    return res.status(200).json(product);
};

module.exports = {
    getAllProducts,
    getProductsId,
    productId,
    updateProducts,
    deleteProductsId,
};
