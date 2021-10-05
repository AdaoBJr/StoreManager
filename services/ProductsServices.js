const Model = require('../models');

const INVALID_ERROR = 'invalid_data';
const ERROR_ID = { err: {
  code: INVALID_ERROR,
  message: 'Wrong id format',
} };

const nameValidation = (name) => {
    const nameRegex = /^.{5,}$/;

    return nameRegex.test(name);
}

const idValidation = (id) => {
  const idRegex = /^.{24}$/;

  return idRegex.test(id);
};


const quantityTypeValidation = (quantity) => typeof(quantity) === 'number';

const quantityValidation = (quantity) => quantity > 0;

const storeProduct = async (data) => {
    const { name, quantity } = data;

    if(!nameValidation(name)) return {err: {
        code: INVALID_ERROR,
        message: '"name" length must be at least 5 characters long',
    }}

    if (!quantityTypeValidation(quantity)) return { err: {
        code: INVALID_ERROR,
        message: '"quantity" must be a number',
      } };
    
      if (!quantityValidation(quantity)) return { err: {
        code: INVALID_ERROR,
        message: '"quantity" must be larger than or equal to 1',
      } };

      const alreadyExists = await Model.products.getProductByName(name);

      if (alreadyExists) return { err: {
        code: INVALID_ERROR,
        message: 'Product already exists',
      }};
    
      return await Model.products.storeProduct(data);
}

const getAllProducts = async () => {
  const products = await Model.products.getAllProducts();
  const allProducts = { products: [...products] };

  return allProducts;
};

const getProductsById = async (id) => {
  if (!idValidation(id)) return { err: {
      code: INVALID_ERROR,
      message: 'Wrong id format',
    }};

  return await Model.products.getProductsById(id);;
};

const updatedProduct = async (id, updatedProduct) => {
  
  if (!idValidation(id)) return { err: {
    code: INVALID_ERROR,
    message: 'Wrong id format',
  } }

  const { name, quantity } = updatedProduct;

  if(!nameValidation(name)) return {err: {
    code: INVALID_ERROR,
    message: '"name" length must be at least 5 characters long',
}}

if (!quantityTypeValidation(quantity)) return { err: {
    code: INVALID_ERROR,
    message: '"quantity" must be a number',
  } };

  if (!quantityValidation(quantity)) return { err: {
    code: INVALID_ERROR,
    message: '"quantity" must be larger than or equal to 1',
  } };

 await Model.products.updatedProduct( id, { name, quantity } );

  return { _id: id, name, quantity } ;
};

const deleteProduct = async (id) => {
  if (!idValidation(id)) return ERROR_ID;

  const deletedProduct = await Model.products.getProductsById(id);

  const product = await Model.products.deleteProduct(id);

  return (product.deletedCount === 1) ? deletedProduct : ERROR_ID;
};

module.exports = {
    storeProduct,
    getAllProducts,
    getProductsById,
    updatedProduct,
    deleteProduct,
}

