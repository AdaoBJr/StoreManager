class ProductService {
  constructor(Product, errorBuilder, codes, messages) {
    this.Product = Product;
    this.errorBuilder = errorBuilder;
    this.codes = codes;
    this.messages = messages;
  }

  async FindAll() {
    const productList = await this.Product.FindAll();
    return { status: this.codes.OK, message: { products: productList } };
  }

  async FindBy(value, id = false) {
    let product = null;
    if (id) {
      product = await this.Product.FindById(value);
    } else {
      product = await this.Product.FindByName(value);
    }
    if (!product) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA,
        message: this.messages.INVALID_ID_FORMAT,
      });
    }
    return { status: this.codes.OK, message: product };
  }

  async InsertOne({ name, quantity }) {
    const product = { name, quantity };
    const foundElement = await this.Product.FindByName(name);
    if (foundElement) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA, 
        message: this.messages.INVALID_NAME_ALREADY_EXISTS,   
      });
    }
      const modelRes = await this.Product.InsertOne(product);
      return { status: this.codes.CREATED, message: modelRes };
  }

  async Update({ id, name, quantity }) {
    const foundProduct = await this.Product.FindById(id);

    if (!foundProduct) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA,
        message: this.messages.INVALID_ID_FORMAT,
      });
    }

    const productToBeUpdated = { id, name, quantity };
    await this.Product.Update(productToBeUpdated);
    const newProduct = await this.Product.FindById(id);
    return { status: this.codes.OK, message: newProduct };
  }

  async Delete(id) {
    const foundProduct = await this.Product.FindById(id);

    if (!foundProduct) {
      return this.errorBuilder({
        status: this.codes.UNPROCESSABLE_ENTITY,
        code: this.codes.INVALID_DATA,
        message: this.messages.INVALID_ID_FORMAT,
      });
    }
    await this.Product.Delete(id);
    return { status: this.codes.OK, message: foundProduct };
  }
}

module.exports = ProductService;