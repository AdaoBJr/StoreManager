class SalesService {
  constructor({ product, sales, messages, codes, errorBuilder }) {
    this.Product = product;
    this.Sales = sales;
    this.messages = messages;
    this.codes = codes;
    this.errorBuilder = errorBuilder;
    this.findProductsFromList = this.findProductsFromList.bind(this);
  }

  async GetAll() {
    const list = await this.Sales.GetAll();
    return { status: this.codes.OK, message: { sales: list } };
  }

  async FindById(id) {
    const foundSale = await this.Sales.FindById(id);
    if (!foundSale) {
      return this.errorBuilder({
        status: this.codes.NOT_FOUND,
        code: this.codes.INVALID_NOT_FOUND,
        message: this.messages.SALES_NOT_FOUND,
      });
    }

    return { status: this.codes.OK, message: foundSale };
  }

  async Update({ id, newValues }) {
    const foundSale = await this.Sales.FindById(id);

    if (!foundSale) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA,
        message: this.messages.INVALID_ID_FORMAT,
      });
    }

    const updateRes = await this.Sales.Update({ id, newValues }, foundSale);
    if (updateRes && updateRes.code) {
      return this.errorBuilder({
        status: this.codes.NOT_FOUND,
        code: this.codes.STOCK_PROBLEM,
        message: this.messages.INVALID_STOCK_QTY,
      });
    }
    const newValuesSale = await this.Sales.FindById(id);
    return { status: this.codes.OK, message: newValuesSale };
  }

  async InsertOne(itensSold) {
    const ids = await this.findProductsFromList(itensSold);

    if (ids.some((id) => id === null)) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA,
        message: this.messages.INVALID_PRODUCT_ID_QUANTITY,
      });
    }

    const insertedElements = await this.Sales.InsertOne(itensSold);
    if (insertedElements.code) {
      return this.errorBuilder({
        status: this.codes.NOT_FOUND,
        code: this.codes.STOCK_PROBLEM,
        message: this.messages.INVALID_STOCK_QTY,
      });
    }
    return { status: this.codes.OK, message: insertedElements };
  }

  async Delete(id) {
    const foundSale = await this.Sales.FindById(id);

    if (!foundSale) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA,
        message: this.messages.INVALID_SALE_ID_FORMAT,
      });
    }

    await this.Sales.Delete(id, foundSale);

    return { status: this.codes.OK, message: foundSale };
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
