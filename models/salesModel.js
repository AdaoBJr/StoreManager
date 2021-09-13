const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = (data) => 
  connection().then((db) => {
      const stockValidation = data.map(async (item) => {
      const productFound = await db.collection('products')
      .findOne({ _id: ObjectId(item.productId) });
      if (item.quantity > productFound.quantity) { return false; } return true; 
});
  return Promise.all(stockValidation).then((values) => { 
    const isStockValid = values.every((item) => item === true);
    if (isStockValid === false) { return null; }
    const alteration = data.map((item) => db.collection('products')
    .updateOne({ _id: ObjectId(item.productId) }, { $inc: { quantity: (-1) * item.quantity } }));
    return Promise.all(alteration).then(() => db.collection('sales')
    .insertOne({ itensSold: data }));
  });
  })  
  .then((result) => { 
      if (result === null) { return null; }
    return result.ops[0];
});

const getAll = () => connection()
.then((db) => db.collection('sales').find({}).toArray());

const getById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id))); 
};

const editSale = (id, itensSold) => {
  connection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));

  return { _id: id, itensSold };
};

const deleteSale = (id) => { 
  if (!ObjectId.isValid(id)) return null;
const promises = [];
  return connection()
  .then((db) => db.collection('sales').findOne(ObjectId(id))
    .then((data) => {
      if (data === null) return null;
      data.itensSold.forEach((item, index) => {
        promises[index] = db.collection('products')
          .updateOne({ _id: ObjectId(item.productId) }, { $inc: { quantity: item.quantity } });
      });
      return Promise.all(promises).then(() => db.collection('sales')
      .findOneAndDelete({ _id: ObjectId(id) }));
    }));
};

module.exports = { 
  createSale,
  getAll,
  getById,
  editSale,
  deleteSale,
};