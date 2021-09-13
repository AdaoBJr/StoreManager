const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = (data) => 
  connection()
  .then((db) => {
    data.forEach((item) => {
      db.collection('products')
      .updateOne({ _id: ObjectId(item.productId) }, { $inc: { quantity: (-1) * item.quantity } }); 
});
    return db.collection('sales').insertOne({ itensSold: data });
  })
  .then((result) => result.ops[0]);

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
console.log('cheguei no model com id', id);
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