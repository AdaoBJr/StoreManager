const SalesModels = require('../model/modelSales');
const ProductModels = require('../model/modelProducts');
const { quantitySalesValid, format } = require('../schemas/schemasValidate');

const decProducts = async (id, quantity) => {
  await ProductModels.decProducts(id, quantity);
};

// font: https://github.com/tryber/sd-010-b-store-manager/tree/denis-rossati-sd-010-b-store-manager

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
  const verify = await checkUpdate(sales);

  if (verify.err) return verify;
  if (verify) return { outStock: true };

  const sale = format(sales);
  // cria venda no db
  const salesMade = await SalesModels.create(sale);
  // altera quantidade de produtos no stock
  await sales.forEach(async (el) => decProducts(el.productId, el.quantity));
  // retorna venda efetuada
  return { _id: salesMade.insertedId, itensSold: sales };
};

module.exports = { create };
