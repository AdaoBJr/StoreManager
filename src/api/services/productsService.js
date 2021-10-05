const { bodyValidation, nameValidation } = require('../validations/productValidation');
const { newProduct, getAllProducts, getProductById } = require('../models/productsModel');
const productsModel = require('../models/productsModel');
const throwError = require('../helpers/throwError');

const addProduct = async (product) => {
    const { error } = bodyValidation(product);
    const res = await nameValidation(product.name);
    if (error) {
      const { details: [{ message }] } = error;
      throw throwError(422, { err: {
        code: 'invalid_data',
        message,
      } });
    }
    if (res) {
      throw throwError(422, { err: {
        code: 'invalid_data',
        message: 'Product already exists',
      } });
    }
    // adicionar produto no banco
    return newProduct(product.name, product.quantity);
};

// const getProducts = async () => {
//   try {
//     return await getAllProducts();
//   } catch (error) {
//     console.log(error);
//   }
// }

const getProducts = () => getAllProducts();

const getProductWithId = async (params) => {
    if (!params.id) {
 throw throwError(422, { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } }); 
}
    const product = await getProductById(params.id);
    if (!product) {
 throw throwError(422, { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } }); 
}
    return product;
};

// nao é a melhor forma de fazer, mas fazer oq... !nao tenho tempo!
const updateProductWithId = async ({ id }, p) => {
    const { error } = bodyValidation(p);
  
    if (error) {
      const { details: [{ message }] } = error;
      throw throwError(422, { err: {
        code: 'invalid_data',
        message,
      } });
    }

    const updateProduct = await productsModel.update(id, p.name, p.quantity);
    return updateProduct;
};

// nao é a melhor forma de fazer, mas fazer oq... !nao tenho tempo!
const deleteProductWithId = async ({ id }) => {
  const deleted = await productsModel.exclude(id);
  if (!deleted) {
    throw throwError(422, { err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    } }); 
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductWithId,
  updateProductWithId,
  deleteProductWithId,
};
