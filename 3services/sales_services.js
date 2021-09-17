const {
  createSalesModel,
  showAllsalesModel,
  showByIdsalesModel,
  updatesalesModel,
} = require('../4models/sales_model');

// const validaName = (name) => (name.length < 6);
const validaQuantity = (quantity) => (quantity <= 0);
const validaNumber = (quantity) => (typeof quantity !== 'number');
// const existItem = async (name) => (await findByName(name)) !== null;

const code = 'invalid_data';
const message = 'Wrong product ID or invalid quantity';
const error = { err: { code, message } };

const createSalesServices = async (sales) => {
  const validate = sales.map((sale) => {
    const { quantity } = sale;
    switch (true) {
      case validaQuantity(quantity):
        return [true, error];
      case validaNumber(quantity):
        return [true, error];
      default:
        return [false];
    }
  });
    const notValid = validate.find((valid) => valid[0]);
  if (notValid) {
    return notValid[1];
  }
  return createSalesModel(sales);
};

const showsalesService = async (id) => {
  if (id) {
    return showByIdsalesModel(id);
  }
  return { sales: await showAllsalesModel() };
};

const updatesalesService = async (data, id) => {
  const validate = data.map((sale) => {
    const { quantity } = sale;
    switch (true) {
      case validaNumber(quantity):
        return [true, error];
      case validaQuantity(quantity):
        return [true, error];
      default:
        return [false];
    }
  });
    const notValid = validate.find((valid) => valid[0]);
  if (notValid) {
    return notValid[1];
  }
  return updatesalesModel(data, id);
};

module.exports = {
  createSalesServices,
  showsalesService,
  updatesalesService,
};
