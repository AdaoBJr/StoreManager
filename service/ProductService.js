const { errorBuilder } = require('../middleware/errorMiddleware');
const Product = require('../model/Product');
const codes = require('../schemas/codes');
const messages = require('../schemas/messages');

class ProductService {
  constructor() {
    this.Product = new Product();
  }

  async FindAll() {
    const productList = await this.Product.FindAll();
    return { status: codes.OK, message: { products: productList } };
  }

  async FindBy(value, id = false) {
    let product = null;
    if (id) {
      product = await this.Product.FindById(value);
    } else {
      product = await this.Product.FindByName(value);
    }

    if (!product) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA,
        message: messages.INVALID_ID_FORMAT,
      });
    }
    return { status: codes.OK, message: product };
  }

  async InsertOne({ name, quantity }) {
    const product = { name, quantity };
    const foundElement = await this.Product.FindByName(name);
    if (foundElement) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA, 
        message: messages.INVALID_NAME_ALREADY_EXISTS,   
      });
    }
      const modelRes = await this.Product.InsertOne(product);
      return { status: codes.CREATED, message: modelRes };
  }

  async Update({ id, name, quantity }) {
    const foundProduct = await this.Product.FindById(id);

    if (!foundProduct) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA,
        message: messages.INVALID_ID_FORMAT,
      });
    }

    const productToBeUpdated = { id, name, quantity };
    await this.Product.Update(productToBeUpdated);
    const newProduct = await this.Product.FindById(id);
    return { status: codes.OK, message: newProduct };
  }

  async Delete(id) {
    const foundProduct = await this.Product.FindById(id);

    if (!foundProduct) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA,
        message: messages.INVALID_ID_FORMAT,
      });
    }
    await this.Product.Delete(id);
    return { status: codes.OK, message: foundProduct };
  }
}

module.exports = ProductService;