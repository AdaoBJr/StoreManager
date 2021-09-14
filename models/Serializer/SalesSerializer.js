class SalesSerializer {
  constructor() {
    this.id = null;
    this.itensSold = null;
  }

  Serialize({ _id, itensSold }) {
    this.id = _id;
    this.itensSold = itensSold;
  }

  All(sale) {
    this.Serialize(sale);
    return { _id: this.id, itensSold: this.itensSold };
  }
}

module.exports = SalesSerializer;