const { ObjectID } = require('mongodb');   
const connection = require('../infraestructure/database/connection');
const ProductSerializer = require('./Serializer/ProductSerializer');

class Product {
  constructor() {
    this.db = connection;
    this.serializer = new ProductSerializer();
    this.table = 'products';
  }

  async FindAll() {
    const db = await this.db();
    const allList = await db.collection(this.table).find().toArray();
    return allList.map((product) => this.serializer.All(product));
  }

  async FindById(id) {
    try {
      const query = { _id: ObjectID(id) };
      const db = await this.db();
      const foundProduct = await db.collection(this.table).findOne(query);
      if (!foundProduct) return null;
      return this.serializer.All(foundProduct);
    } catch (err) {
      return null;
    }
  }

  async FindByName(name) {
      const query = { name };
      const db = await this.db();
      const foundProduct = await db.collection(this.table).findOne(query);
      if (foundProduct) {
        return this.serializer.All(foundProduct);
      }
      return null;
  }

  async InsertOne({ name, quantity }) {
    const product = { name, quantity };
    const db = await this.db();
    const result = await db.collection(this.table).insertOne(product);
    return this.serializer.All(result.ops[0]);
  }

  async Update({ id, name, quantity }) {
    const query = { _id: ObjectID(id) };
    const newValues = { $set: { name, quantity } };
    const db = await this.db();
    await db.collection(this.table).updateOne(query, newValues);
  }

  async Delete(id) {
    const query = { _id: ObjectID(id) };
    const db = await this.db();
    await db.collection(this.table).deleteOne(query);
  }
}

module.exports = Product;