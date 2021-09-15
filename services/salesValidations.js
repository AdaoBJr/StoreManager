const salesModels = require('../models/saleModels');

const validateNotString = (quantity) => {
  if (typeof quantity === 'string') {
    return false;
  }
  return true;
};

const validateSaleQuantity = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

// função feita com ajuda de Felippe Correia
const mapSales = (body) => {
  const salemap = body.map((s) => {
    const validQuantNotString = validateNotString(s.quantity);
    const validSaleQuantity = validateSaleQuantity(s.quantity);
    if (!validQuantNotString || !validSaleQuantity) {
      return false;
    }
    return true;
  });
  return salemap[0];
};

const validateCreateSale = async (body) => {
  if (mapSales(body) === false) {
    return { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  }
  const createSale = await salesModels.createSales(body);
  return createSale;
};

module.exports = {
  validateCreateSale,
};
