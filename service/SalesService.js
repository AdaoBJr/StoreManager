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

  async FindById(id) {
    const foundSale = await this.Sales.FindById(id);
    if (!foundSale) {
      return errorBuilder({
        status: codes.NOT_FOUND,
        code: codes.INVALID_NOT_FOUND,
        message: messages.SALES_NOT_FOUND,
      }); 
    }

    return { status: codes.OK, message: foundSale };
  }

  async Update({ id, newValues }) {
    const foundSale = await this.Sales.FindById(id);

    if (!foundSale) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA,
        message: messages.INVALID_ID_FORMAT,
      });
    }

    await this.Sales.Update({ id, newValues });
    const newValuesSale = await this.Sales.FindById(id);

    return { status: codes.OK, message: newValuesSale };
  }

  async InsertOne(itensSold) {
      const ids = await this.findProductsFromList(itensSold);  

      if (ids.some((id) => id === null)) {
        return errorBuilder({
          status: codes.UNPROCESSABLE_ENTITY,
          code: codes.INVALID_DATA,
          message: messages.INVALID_PRODUCT_ID_QUANTITY,
        });
      }

      const insertedElements = await this.Sales.InsertOne(itensSold);

      return ({ status: codes.OK, message: insertedElements });
  }

  async Delete(id) {
    const foundSale = await this.Sales.FindById(id);

    if (!foundSale) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA,
        message: messages.INVALID_SALE_ID_FORMAT,
      });
    }

    await this.Sales.Delete(id);

    return ({ status: codes.OK, message: foundSale });
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
