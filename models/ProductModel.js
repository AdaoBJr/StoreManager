const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection()
  .then((db) => db.collection('products').find().toArray())
  .then((result) => result);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const getProductId = await connection()
    .then((db) => db.collection('products').findOne(new ObjectId(id)));  

  if (!getProductId) return null;

  return getProductId;
};

const create = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result.ops[0]);

const findName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .then((result) => result);
  
const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => 
      db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
      .then(() => ({ _id: id, name, quantity })));
};

const updateProductBySale = async (prodId, prodQuant, saleQuant) => connection()
  .then((db) => db.collection('products')
  .updateOne(
    { _id: ObjectId(prodId) },
    { $set: { quantity: prodQuant - saleQuant } },
  ));
 
const exclude = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const excludeProduct = await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

  if (!excludeProduct.deletedCount) return null;

  return excludeProduct;
};

const updateProductBySaleExclude = async (id) => {
  const saleId = await connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  
  const arrSale = saleId.itensSold;

  const listProducts = await getAll();

  // console.log(saleId.itensSold)

  arrSale.map((sale) => listProducts.map(({ _id, quantity }) => {
      if (_id.toString() === sale.productId) {
        return connection().then((db) => db.collection('products')
        .updateOne(
          { _id: ObjectId(sale.productId) },
          { $set: { quantity: quantity + sale.quantity } },
        ));
      }

      return null;
    }));
};

module.exports = {
  getAll,
  findById,
  create,
  findName,
  update,
  exclude,
  updateProductBySale,
  updateProductBySaleExclude,
};