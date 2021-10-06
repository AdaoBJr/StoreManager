const connection = require('./connection');

const getNewProduct = (productData) => {
const { id, name, quantity } = productData;

return {
  id,
  name,
  quantity,
 };
};

const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => getNewProduct({ id: result.insertedId, name, quantity }));

const findByName = async (name, quantity) => {
  const query = { name, quantity };
  const product = await connection()
    .then((db) => db.collection('products').findOne(query));
  if (!product) return null;

  return getNewProduct(product);
};

module.exports = {
  create,
  findByName,
};
