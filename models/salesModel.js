const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSale = (sale) =>
  connection().then((db) => {
    const validationTotal = sale.map(async (item) => {
      const product = await db.collection('products')
      .findOne({ _id: ObjectId(item.productId) });
      if (item.quantity > product.quantity) { return false; } return true;
    });
    return Promise.all(validationTotal).then((values) => {
      const isValid = values.every((item) => item === true);
      if (isValid === false) return null;
      const alter = sale.map((item) => db.collection('products')
      .updateOne({ _id: ObjectId(item.productId) }, { $inc: { quantity: (-1) * item.quantity } }));
      return Promise.all(alter).then(() => db.collection('sales')
      .insertOne({ itensSold: sale }));
    });
  })
  .then((result) => {
    if (result === null) return null;
    return result.ops[0];
  });

const getAll = () =>
  connection()
  .then((db) => db.collection('sales').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = (id, itensSold) => {
  connection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  return { _id: id, itensSold };
};

const deleteSale = (id) => {
  if (!ObjectId.isValid(id)) return null;
  const results = [];
  return connection()
  .then((db) => db.collection('sales')
  .findOne(ObjectId(id))
  .then((data) => {
    if (data === null) return null;
    data.itensSold.forEach((item, index) => {
      results[index] = db.collection('products')
      .updateOne({ _id: ObjectId(item.productId) }, { $inc: { quantity: item.quantity } });
    });
    return Promise.all(results).then(() => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
  }));
};

module.exports = {
  registerSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};