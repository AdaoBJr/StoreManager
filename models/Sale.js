const { ObjectId } = require('mongodb');
const connection = require('./connection');

const formatSale = ({ itensSold, pid }) => ({
    pid,
    itensSold,
  });

const updateProductQuantityNewSale = async (itensSold) => {
  const LESS_ONE = -1;
  itensSold.forEach(async (item) => {
    const quantitySold = item.quantity * LESS_ONE;
    const pid = ObjectId(item.productId);
    const db = await connection();
    return db.collection('products')
      .updateOne({ pid }, { $inc: { quantity: quantitySold } }); 
  });
};

const updateProductQuantitySaleUpdate = async (id, itens) => {
  itens.forEach(async (item) => {
    const quantityUpdated = item.quantity;
    // Atenção: antigo estava const sale = await itens.findById(id);
    const sale = await itens.findById(id);
    const oDeAgora = sale.itensSold
      .find((toUpdate) => toUpdate.productId === item.productId);
    const oldQuantity = oDeAgora.quantity;
    const newQuantity = oldQuantity - quantityUpdated;
    const pid = ObjectId(item.productId);
    const db = await connection();
    await db.collection('products')
      .updateOne({ pid }, { $inc: { quantity: newQuantity } }); 
  });
};

const updateProductQuantitySaleDelete = async (deleted) => {
  deleted.itensSold.forEach(async (item) => {
    const oldQuantity = item.quantity;
    const pid = ObjectId(item.productId);
    const db = await connection();
    await db.collection('products')
      .updateOne({ pid }, { $inc: { quantity: oldQuantity } }); 
  });
};

const create = async (soldProducts) => {
  const db = await connection();
  const createNew = await db.collection('sales').insertOne({ itensSold: soldProducts }); 
  const result = await createNew.ops[0];
  const newSale = formatSale(result);
  await updateProductQuantityNewSale(newSale.itensSold);
  return newSale;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const pid = ObjectId(id);
  const sale = await connection()
    .then((db) => db.collection('sales').findOne({ pid }));
  if (!sale) return null;
  return formatSale(sale);
};

const getAll = async () => {
  const sales = await connection()
    .then((db) => db.collection('sales').find());
  const result = await sales.toArray();
  return result.map(formatSale);
};

const edit = async (id, itens) => {
  const db = await connection();
  const pid = ObjectId(id);
  await updateProductQuantitySaleUpdate(id, itens);
  const edition = await db.collection('sales')
    .updateOne({ pid }, { $set: { itensSold: itens } }); 
  const edited = await findById(id);
  const editedFormated = formatSale(edited);
  console.log(edition);
  return editedFormated;
};

const deleteOne = async (id) => {
  const db = await connection();
  const pid = ObjectId(id);
  const deleted = await findById(id);
  const deleting = await db.collection('sales')
    .deleteOne({ pid }); 
  const formatDelete = formatSale(deleted);
  console.log(deleting);
  await updateProductQuantitySaleDelete(formatDelete);
  return formatDelete;
};

module.exports = { create, findById, getAll, edit, deleteOne };
