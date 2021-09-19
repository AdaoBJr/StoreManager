const { ObjectId } = require('mongodb');
const { getConnection } = require('./connection');

const err = {
    code: 'not_found',
    message: 'Sale not found',
};

const getSalesId = async (req, res) => {
    const dbSales = await getConnection()
    .then((db) => db.collection('sales'));
    const { id } = req.params;
    const result1 = ObjectId.isValid(id);
    if (!result1) {
      return res.status(404).json({ err });
    }
    const result = await dbSales.findOne({ _id: ObjectId(id) });
    if (!result) {
        return res.status(404).json({ err });
      }
    return result;
};

const salesId = async (req, res) => {
    const sales = await getSalesId(req, res);
    return res.status(200).json(sales);
};

const getAllSales = async (req, res) => {
    const dbSales = await getConnection()
    .then((db) => db.collection('sales'));

    const sales = await dbSales.find({ _id: { $exists: true } }).toArray();
        return res.status(200).json({ sales });
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    const itensSold = req.body;
    const [{ productId, quantity }] = itensSold;
    const db = await getConnection();
  await db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { productId, quantity } },
  );
    return res.status(200).json({ _id: id, itensSold });
};

const deleteSalesId = async (req, res) => {
  const { id } = req.params;
  const db = await getConnection();
  const sale = await salesId(req, res);
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return res.status(200).json(sale);
};

const saleQuantity = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id.length !== 24) {
      return res.status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  next();
};

module.exports = { 
    salesId,
    getAllSales,
    updateSales,
    deleteSalesId,
    saleQuantity,
 };