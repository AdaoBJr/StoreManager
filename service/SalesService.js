const Product = require('../model/Product');
const Sales = require('../model/Sales');
const messages = require('../schemas/messages');
const codes = require('../schemas/codes');
const { errorBuilder } = require('../middleware/errorMiddleware');

class SalesService {
  constructor() {
    this.Product = new Product();
    this.Sales = new Sales();
  }

  async GetAll() {
    const list = await this.Sales.GetAll();
    return { status: codes.OK, message: { sales: list } };
  }

  async InsertOne(itensSold) {
      const ids = await this.findProductsFromList(itensSold);  

      if (ids.some((id) => id === null)) {
        return errorBuilder({
          status: codes.UNPROCESSABLE_ENTITY,
          code: codes.UNPROCESSABLE_ENTITY,
          message: messages.INVALID_PRODUCT_ID_QUANTITY,
        });
      }

      const insertedElements = await this.Sales.InsertOne(itensSold);

      return ({ status: codes.OK, message: insertedElements });
  }

  async findProductsFromList(itensSold) {
    const products = [];

    itensSold.forEach(async ({ productId }) => {
      const foundProduct = this.Product.FindById(productId);
      products.push(foundProduct);
    });

    const resolvedProducts = await Promise.all(products).then((res) => res);
    return resolvedProducts;
  }
}

module.exports = SalesService;
