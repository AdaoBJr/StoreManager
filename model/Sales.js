const { ObjectID } = require('mongodb');   
const connection = require('../infraestructure/database/connection');
const SalesSerializer = require('./Serializer/SalesSerializer');

class Sales {
  constructor() {
    this.db = connection;
    this.table = 'sales';
    this.serializer = new SalesSerializer();
  }

  async GetAll() {
   const db = await this.db();
   const salesList = await db.collection(this.table).find().toArray();

   return salesList.map((sale) => this.serializer.All(sale));
  }

  async FindById(id) {
    try {
      const query = { _id: ObjectID(id) };
      const db = await this.db();
      const foundSale = await db.collection(this.table).findOne(query);
  
      if (!foundSale) return null;
  
      return this.serializer.All(foundSale);
    } catch (error) {
      return null;
    }
  }

  async InsertOne(sales) {
    const query = { itensSold: sales };
     const db = await this.db();
    const { ops: insertedSales } = await db.collection(this.table).insertOne(query);
    return this.serializer.All(insertedSales[0]);
  }
}

module.exports = Sales;