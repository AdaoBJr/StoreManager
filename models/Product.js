class Product {
  constructor(connection, serializer, objectID) {
    this.db = connection;
    this.serializer = serializer;
    this.table = 'products';
    this.ObjectID = objectID;
  }

  async FindAll() {
    const allList = await this.db.collection(this.table).find().toArray();
    return allList.map((product) => this.serializer.All(product));
  }

  async FindById(id) {
    try {
      const query = { _id: this.ObjectID(id) };
      const foundProduct = await this.db.collection(this.table).findOne(query);
      if (!foundProduct) return null;
      return this.serializer.All(foundProduct);
    } catch (err) {
      return null;
    }
  }

  async FindByName(name) {
      const query = { name };

      const foundProduct = await this.db.collection(this.table).findOne(query);
      if (foundProduct) {
        return this.serializer.All(foundProduct);
      }
      return null;
  }

  async InsertOne({ name, quantity }) {
    const product = { name, quantity };
    const result = await this.db.collection(this.table).insertOne(product);
    return this.serializer.All(result.ops[0]);
  }

  async Update({ id, name, quantity }) {
    const query = { _id: this.ObjectID(id) };
    const newValues = { $set: { name, quantity } };

    await this.db.collection(this.table).updateOne(query, newValues);
  }

  async Delete(id) {
    const query = { _id: this.ObjectID(id) };

    await this.db.collection(this.table).deleteOne(query);
  }
}

module.exports = Product;