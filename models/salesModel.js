const { ObjectId } = require('mongodb');
const connection = require('./connection');

const modelCreate = async (itensSold) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold });
return { code: 200, itensSold: { _id: sales.insertedId, itensSold } };
};

const modelEraser = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sales = await db.collection('sales').findOne(new ObjectId(id));
  await db.collection('sales').deleteOne({ _id: new ObjectId(id) });
  return { code: 200, sales };
};

const modelUpdater = async ({ id, itensSold }) => {
  const db = await connection();
 await db.collection('sales').updateOne({
     _id: new ObjectId(id),
    },
     {
       $set: {
              itensSold,
              } });
  return { code: 200, itensSold: { _id: id, itensSold } };
};

const modelListById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const sales = await db.collection('sales').findOne(new ObjectId(id));
  console.log(sales, 'sales');
  if (!sales) return undefined;
  return { code: 200, itensSold: sales };
};

const modelListAll = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();
  return { code: 200, itensSold: { sales } };
};

module.exports = {
  modelCreate,
  modelListById,
  modelListAll,
  modelUpdater,
  modelEraser,
};