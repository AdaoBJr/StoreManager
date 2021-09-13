const ProductModel = require('../models/productsModels');

const ERR_ID = {
  err: { code: 'invalid_data', message: 'Wrong id format' },
};

const ERR_LENGTH_NAME = {
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
};

// const ERR_NAME_EXISTS = {
//   err: { code: 'invalid_data', message: 'Product already exists' },
// };

const ERR_QUANTITY = {
  err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
};

const ERR_TYPE_QUANTITY = {
  err: { code: 'invalid_data', message: '"quantity" must be a number' },
};

const isValidLengthName = (name) => {
  if (name.length < 5) return false;
  return true;
};

const verifyQuantity = (quantity) => {  
  if (quantity <= 0) return null;
  return true;
};

const verifyType = (quantity) => {
  if (typeof quantity === 'string') return null;
  return true;
};

const getAll = async () => ProductModel.getAll();

const getProductById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) return ERR_ID;

  return product;
};

const createProduct = async ({ name, quantity }) => {  
  // console.log(name, quantity);
  if (!isValidLengthName(name)) return ERR_LENGTH_NAME;
  if (!verifyQuantity(quantity)) return ERR_QUANTITY;
  if (!verifyType(quantity)) return ERR_TYPE_QUANTITY;

  const existingProduct = await ProductModel.findByName(name);    
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  const newProduct = await ProductModel.create({ name, quantity });  
  return newProduct;
};

const updateProduct = async (id, { name, quantity }) => {
  if (!isValidLengthName(name)) return ERR_LENGTH_NAME;
  if (!verifyQuantity(quantity)) return ERR_QUANTITY;
  if (!verifyType(quantity)) return ERR_TYPE_QUANTITY;

  const existingProduct = await ProductModel.findByName(name);    
  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  const product = await ProductModel.update(id, { name, quantity });
  console.log(product);
  return product;
};

const deleteProduct = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) return ERR_ID;

  const productDeleted = await ProductModel.exclude(id);

  return productDeleted;
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};