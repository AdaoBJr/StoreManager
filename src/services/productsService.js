const productsModel = require('../models/productsModel');

const dictionary = () => ({
  messages: {
    nameLengthValidation: '"name" length must be at least 5 characters long',
    quantityAmountValidation: '"quantity" must be larger than or equal to 1',
    quantityTypeValidation: '"quantity" must be a number',
    alreadyExists: 'Product already exists',
    wrongID: 'Wrong id format',
  },
  status: {
    ok: 200,
    created: 201,
    unprocessableEntity: 422,
    internalServerError: 500,
  },
  code: {
    invalidData: 'invalid_data',
  },
});

const validateNameLength = (name) => {
  const { nameLengthValidation } = dictionary().messages;
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;

  if (name.length < 5) {
    return {
      err: { message: nameLengthValidation, code: invalidData, status: unprocessableEntity },
    };
 }
};

const checkDoubleName = async (name) => {
  const { unprocessableEntity } = dictionary().status;
  const { alreadyExists } = dictionary().messages;
  const { invalidData } = dictionary().code;

  const checkedName = await productsModel.checkName(name);

  if (checkedName) {
    return { err: { message: alreadyExists, code: invalidData, status: unprocessableEntity } };
  }
};

const validateQuantityType = (quantity) => {
  const { quantityTypeValidation } = dictionary().messages;
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;

    if (typeof quantity !== 'number') {
      return {
        err: { message: quantityTypeValidation, code: invalidData, status: unprocessableEntity },
      };
    }
};

const validateQuantityAmount = (quantity) => {
  const { unprocessableEntity } = dictionary().status;
  const { quantityAmountValidation } = dictionary().messages;
  const { invalidData } = dictionary().code;

  if (quantity <= 0) {
    return {
      err: { message: quantityAmountValidation, code: invalidData, status: unprocessableEntity },
    };
  }
};

const addProduct = async (name, quantity) => {
  if (validateNameLength(name)) return validateNameLength(name);
  if (validateQuantityType(quantity)) return validateQuantityType(quantity);
  if (validateQuantityAmount(quantity)) return validateQuantityAmount(quantity);
  if (await checkDoubleName(name)) return checkDoubleName(name);

  const newProduct = await productsModel.addProduct(name, quantity);

  return newProduct;
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  const allProductsFormatted = { products: allProducts };
  return allProductsFormatted;
};

const getProductById = async (id) => {
  const { wrongID } = dictionary().messages;
  const { unprocessableEntity } = dictionary().status;
  const { invalidData } = dictionary().code;

  if (id.length !== 24 || !await productsModel.getProductById(id)) {
    return {
      err: { message: wrongID, code: invalidData, status: unprocessableEntity },
    };
  }

  const product = await productsModel.getProductById(id);

  return product;
};

const updateProductById = async (id, name, quantity) => {
  if (validateNameLength(name)) return validateNameLength(name);
  if (validateQuantityType(quantity)) return validateQuantityType(quantity);
  if (validateQuantityAmount(quantity)) return validateQuantityAmount(quantity);

  const attProduct = await productsModel.updateProductById(id, name, quantity);

  return attProduct;
};

module.exports = { addProduct, getAllProducts, getProductById, dictionary, updateProductById };
