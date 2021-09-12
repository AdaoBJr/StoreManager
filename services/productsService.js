const { ObjectId } = require('mongodb');
const ProductsModels = require('../models/productsModels');

const productsValidationName = (name) => {
  if (name.length < 5) {
      return {
       err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long', 
        },
      };
    }
    return false;
  };

const productsAlreadyExists = async (name) => {
  const findByName = await ProductsModels.findByName(name);
  if (findByName) {
    console.log();
 return ({
   err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
  }); 
}
return false;
};

const verifyQuantityNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
     };
  }
  return false;
};

const verifyQuantity = (quantity) => {
 if (quantity < 1) {
   return {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
   };
 }
 return false;
};

const createProduct = async (name, quantity) => {
  const x = productsValidationName(name);
  if (x) return x;
  const y = await productsAlreadyExists(name);
  if (y) return y;
  const z = verifyQuantityNumber(quantity);
  console.log(z);
  if (z) return z;
  const w = verifyQuantity(quantity);
  if (w) return w;
 
  const product = await ProductsModels.createProduct(name, quantity);

  return {
    product,
  };
};

const getAllProducts = async () => {
  const products = await ProductsModels.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const productId = await ProductsModels.getProductById(id);  
  if (!productId || (!ObjectId.isValid(id))) {
    return {
      err: {
        code: 'invalid_data',
        message: '"Wrong id format',
      },
  }; 
   }
   return productId;
};

module.exports = { 
  productsValidationName,
  productsAlreadyExists,
  createProduct,
  verifyQuantityNumber,
  verifyQuantity,
  getAllProducts,
  getProductById,
};