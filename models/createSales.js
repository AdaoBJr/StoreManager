const { getConnection } = require('./connection');

const createSales = async (req, res) => {
    const salesCollection = await getConnection()
    .then((db) => db.collection('sales'));
    const { id, quantity } = req.params;
    const { insertedId: _id } = await salesCollection
    .insertOne({ itensSold: [{ productId: id, quantity }] });
    return res.status(200).json({ _id, itensSold: [{ productId: id, quantity }] });
};

module.exports = {
    createSales,
};