const { errorBuilder } = require('../middleware/errorMiddleware');
const Product = require('../model/Product');
const codes = require('../schemas/codes');
const messages = require('../schemas/messages');

class ProductService {
  constructor() {
    this.Product = new Product();
  }

  async FindAll() {
    await this.Product.FindAll();
  }

  async InsertOne({ name, quantity }) {
    const product = { name, quantity };
    const foundElement = await this.Product.FindOne(name);
    if (foundElement) {
      return errorBuilder({
        status: codes.UNPROCESSABLE_ENTITY,
        code: codes.INVALID_DATA, 
        message: messages.INVALID_NAME_ALREADY_EXISTS,   
      });
    }
    const modelRes = await this.Product.InsertOne(product);
    return { status: 201, message: modelRes };
  }
}

module.exports = ProductService;