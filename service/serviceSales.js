const SalesModels = require('../model/modelSales');
const ProductModels = require('../model/modelProducts');
const { quantitySalesValid, format } = require('../schemas/schemasValidate');

const getById = async (id) => {
  const saleFound = await SalesModels.getById(id);
  
  if (!saleFound) return { err: { code: 'not_found', message: 'Sale not found' } };

  return saleFound;
};

const update = async (id, updateSales) => {
  const editedSale = await SalesModels.update(id, updateSales)
    .then(() => getById(id));
  
  return editedSale;
};

const getAll = async () => {
  const salesList = {
    sales: await SalesModels.getAll(),
  };
  return salesList;
};

// font: https://github.com/tryber/sd-010-b-store-manager/tree/denis-rossati-sd-010-b-store-manager
const decProducts = async (id, quantity) => {
  await ProductModels.decProducts(id, quantity);
};

const incProducts = async (id, quantity) => {
  await ProductModels.incProducts(id, quantity);
};

// verifica se há produtos o bastante p/ venda
const checkUpdate = async (sales) => {
  const quantity = await sales.map(async (sale) => {
    // busca o produto pelo id
    const currentQuantity = await ProductModels.findById(sale.productId);

    const valid = await quantitySalesValid(sale.quantity);
    if (await valid.err) return valid;

    // compara com a quantidade vendida
    const remaningQuantity = currentQuantity.quantity - sale.quantity;
    return remaningQuantity;
  });
  
  const result = await Promise.all(quantity).then((res) => res);

  if (result[0].err) return result;
  // true se todos produtos tem stock
  return result.every((num) => num < 0);
};

const create = async (sales) => {
  const check = await checkUpdate(sales);
  if (check) return { outStock: true };

  const sale = format(sales);
  // cria venda no db
  const salesMade = await SalesModels.create(sale);
  // altera quantidade de produtos no stock
  await sales.forEach(async (el) => decProducts(el.productId, el.quantity));
  // retorna venda efetuada
  return { _id: salesMade.insertedId, itensSold: sales };
};

const deleteSale = async (id) => {
  const saleFound = await SalesModels.getById(id);
  await SalesModels.deleteSale(id);

  if (!saleFound) return { err: { code: 'invalid_data', message: 'Wrong sale ID format' } };

  await saleFound.itensSold
    .forEach(async (el) => incProducts(el.productId, el.quantity));

  return saleFound;
};

module.exports = { create, getAll, getById, update, deleteSale };
