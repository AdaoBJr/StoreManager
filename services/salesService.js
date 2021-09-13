const productsServices = require('./productsService');
const sales = require('../models/sales');

const operations = {
  CREATE_SALE: 'sale',
  UPDATE_SALE: 'update',
  DELETE_SALE: 'delete',
};

const getAll = async () => {
  const salesList = await sales.getAll();
  return { sales: salesList };
};

const findById = async (saleId) => {
  const sale = await sales.findById(saleId);
  return sale;
};

const checkUpdateIsValid = (item, itemInventory, operation, saleQuantityDiference) => (
  (
    itemInventory.quantity < item.quantity && operation !== 'update'
  )
  || (
    itemInventory.quantity < saleQuantityDiference
    )
);

const validateItemSoldQuantity = async (item, operation, saleQuantityDiference) => {
  const itemInventory = await productsServices.findById(item.productId);
  const updateIsValid = checkUpdateIsValid(item, itemInventory, operation, saleQuantityDiference);
  if (updateIsValid) return { err: 'error on first test to update quantity' };
  switch (true) {
  case (operation === 'sale'): itemInventory.quantity -= item.quantity;
    break;
  case (operation === 'update'): itemInventory.quantity -= saleQuantityDiference;
    break;
  case (operation === 'delete'): itemInventory.quantity += item.quantity;
    break;
  default:
    break;
  }

  await productsServices.updateProduct(
    itemInventory.id, itemInventory.name, itemInventory.quantity,
  );
};

const createSale = async (itensSold) => {
  itensSold.forEach((item) => {
    validateItemSoldQuantity(item, operations.CREATE_SALE);
  });
  const { insertedId } = await sales.create(itensSold);
  return { _id: insertedId, itensSold };
};

const updateSale = async (saleId, itemSold) => {
  const { itensSold } = await findById(saleId);
  const itensSoldUpdated = [];
  itensSold.forEach((item, index) => {
    itensSoldUpdated[index] = item;
    if (item.productId === itemSold.productId) {
      const saleQuantityDiference = itemSold.quantity - item.quantity;
      validateItemSoldQuantity(
        item, operations.UPDATE_SALE, saleQuantityDiference,
      );
      itensSoldUpdated[index].quantity = itemSold.quantity;
    }
  });
  const { modifiedCount } = await sales.update(saleId, itensSoldUpdated);
  if (modifiedCount) {
    return { _id: saleId, itensSold };
  }
};

const deleteSale = async (id) => {
  const sale = await findById(id);
  sale.itensSold.forEach((item) => {
    validateItemSoldQuantity(
      item, operations.DELETE_SALE,
    );
  });
  sales.remove(id);
  return sale;
};

module.exports = {
  getAll,
  findById,
  createSale,
  updateSale,
  deleteSale,
};
