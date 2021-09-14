class ProductSerializer {
  constructor() {
    this.id = null;
    this.name = null;
    this.quantity = null;
  }

  Serialize({ _id, quantity, name }) {
    this.id = _id;
    this.name = name;
    this.quantity = quantity;
  }

  All(productArr) {
    this.Serialize(productArr);
    return { _id: this.id, name: this.name, quantity: this.quantity };
  }
}

module.exports = ProductSerializer;