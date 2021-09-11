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
    const allList = await db.collection(this.table).Find().toArray();
    console.log(allList);
  }

  async FindOne(searchParam, isId = false) {
    let query = '';
    if (isId) { 
      query = { _id: searchParam };
    } else {
      query = { searchParam };
    }
    
    const db = await this.db();
    const foundProduct = await db.collection(this.table).findOne(query);
    return foundProduct;
  }

  async InsertOne({ name, quantity }) {
    const product = { name, quantity };
    const db = await this.db();
    const result = await db.collection(this.table).insertOne(product);
    return this.serializer.All(result.ops);
  }
}

module.exports = Product;