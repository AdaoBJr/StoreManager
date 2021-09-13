const productModel = require('../models/products');

// Validando nome!
const HTTP_ERR_FALSE = 422;
const HTTP_OK_STATUS = 201;

const erroMensage = (message) => ({
    err: {
      code: 'invalid_data',
      message,
    },
  });

const isValidProductName = (req, res, next) => {
  const { name } = req.body;
  console.log('Validado o Tamanho do nome, se Existe ou se é um string vazia');
  const erroProductName = '"name" length must be at least 5 characters long';
  const ERRO = erroMensage(erroProductName);

  if (name.length < 5 || !name || name === '') {
    return res.status(HTTP_ERR_FALSE).json(ERRO);
  }
  
    next();
  };

// Validando quantidade

const qauntityIsNumber = (req, res, next) => {
  const { quantity } = req.body;
  console.log('Validado se quantidade é um do tipo numero');
  const erroProductQuantity = '"quantity" must be a number';
  const ERRO = erroMensage(erroProductQuantity);
  if (typeof quantity !== 'number') {
    return res.status(HTTP_ERR_FALSE).json(ERRO);
  }
  next();
};

const isValidQuantity = (req, res, next) => {
  const { quantity } = req.body;
  console.log('Validando se quantidade é maior que 0 e existe');
  const erroProductQuantity = '"quantity" must be larger than or equal to 1';
  const ERRO = erroMensage(erroProductQuantity);
  if (!quantity || quantity < 1) {
    return res.status(HTTP_ERR_FALSE).json(ERRO);
  }
  next();
};

const ifNameExists = async (req, res, next) => {
  const { name } = req.body;
  console.log('Validando se o nome já existe no banco');
  const nameNotDuplicated = await productModel.findForNotDuplicate(name);
  const duplicateNameMensage = 'Product already exists';
  const ERRO = erroMensage(duplicateNameMensage);
  if (nameNotDuplicated) {
    return res.status(HTTP_ERR_FALSE).json(ERRO);
  }

  next();
};

// const quantityIsNumber = (req, res, next) => {
//   const { quantity } = req.body;
//   const erroQuantityIsnotString = '"quantity" must be a number';
//   const ERRO = erroMensage(erroQuantityIsnotString);
//   if (typeof quantity !== 'number') {
//      return res.status(HTTP_ERR_FALSE).json(ERRO);
//   }
//   next();
// };

module.exports = {
  isValidProductName,
  isValidQuantity,
  qauntityIsNumber,
  ifNameExists,
};
