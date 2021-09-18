const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const err = {
    code: 'not_found',
    message: 'Sale not found',
};

const getSalesId = async (req, res) => {
    const productsCollection = await getConnection()
    .then((db) => db.collection('sales'));
    const { id } = req.params;
    const result = ObjectId.isValid(id);
    if (!result) {
        return res.status(422).json({ err });
      }
    const product = await productsCollection.findOne({ _id: ObjectId(id) });
    return product;
};

const salesId = async (req, res) => {
    const product = await getSalesId(req, res);
    return res.status(200).json(product);
};

module.exports = { salesId };