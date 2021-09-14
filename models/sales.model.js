const { ObjectId, ObjectID } = require('mongodb');
const connection = require('./mongoConnection');
const { productSell, getAllProducts, productReturn } = require('./products.model');

const orderSellPromisses = async (sale) => {
  const promisses = sale.map(async (sales) => {
    const promisse = await productSell(sales);
    return promisse;
  });

  return promisses;
};

const orderReturnPromisses = async (sale) => {
  const promisses = sale.map(async (sales) => {
    const promisse = await productReturn(sales);
    return promisse;
  });

  return promisses;
};

const createNewSale = async (sale) => {
  const db = await connection();
  const allProducts = await getAllProducts();

  const isValidQuantity = sale.find((newProduct) => allProducts
  .some((product) => (product.quantity - newProduct.quantity) < 0));

  if (!isValidQuantity) {
    const newSale = await db.collection('sales').insertOne({ itensSold: sale });
    const productsToUpdate = await orderSellPromisses(sale);
    await Promise.all(productsToUpdate);
    const { insertedId } = newSale;
    return { _id: insertedId, itensSold: newSale.ops[0].itensSold };
  }

  return {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    } };
};

const listAll = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const saleById = async (id) => {
  if (!ObjectID.isValid(id)) return false;
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const updateSale = async (id, itemsToUpdate) => {
  const db = await connection();

  const getSale = await saleById(id);
  
  if (!getSale) {
    return {
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } }; 
  }
  const { itensSold } = getSale;
  itensSold.forEach((item, index) => {
    itemsToUpdate.forEach((product) => {
      if (item.productId === product.productId) {
        itensSold[index].quantity = product.quantity;
      }
    });
  });
  
  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return itensSold;
};

const deleteSale = async (id) => {
  const db = await connection();
  const sale = await saleById(id);
  const deletedSale = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  const { deletedCount } = deletedSale;
  
  if (deletedCount > 0) {
    const returnProducts = await orderReturnPromisses(sale.itensSold);
    await Promise.all(returnProducts);
  }
  
  return { deletedCount, sale };
};

module.exports = {
  createNewSale,
  listAll,
  saleById,
  updateSale,
  deleteSale,
};