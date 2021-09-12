const { notEnoughItems } = require('../schemas/salesVal');
const { updateFromPreviousValues, updateValuesFromDelete } = require('./helper/salesHelper');

class Sales {
  constructor(connection, product, serializer, objectId) {
    this.db = connection;
    this.table = 'sales';
    this.Products = product;
    this.serializer = serializer;
    this.objectId = objectId;
  }

  async updateStock(sales) {
    const stockQuantity = [];
    sales.forEach(async ({ productId }) => { 
      stockQuantity.push(this.Products.FindById(productId));
    });
      const stockItems = await Promise.all(stockQuantity);
      if (notEnoughItems(stockItems, sales)) throw new Error('missingItems');
      const newStockValues = []; 
      stockItems.forEach(({ _id: id, name, quantity }, i) => {
        const updatedQty = quantity - sales[i].quantity;
        newStockValues.push(this.Products.Update({ id, name, quantity: updatedQty }));
      });
      
      await Promise.all(newStockValues);
  }

  async GetAll() {
   const salesList = await this.db.collection(this.table).find().toArray();

   return salesList.map((sale) => this.serializer.All(sale));
  }

  async FindById(id) {
    try {
      const query = { _id: this.objectId(id) };
      const foundSale = await this.db.collection(this.table).findOne(query);
  
      if (!foundSale) return null;
  
      return this.serializer.All(foundSale);
    } catch (error) {
      return null;
    }
  }

  async InsertOne(sales) {
    try {
      const query = { itensSold: sales };

      await this.updateStock(sales);
  
      const { ops: insertedSales } = await this.db.collection(this.table).insertOne(query);
  
      return this.serializer.All(insertedSales[0]);
    } catch (e) {
      return { code: e.message };
    }
  }

  async Update({ id, newValues }, foundSale) {
    try {
      const query = ({ _id: this.objectId(id) });
      const values = ({ $set: { itensSold: newValues } });
      const updateValues = updateFromPreviousValues(newValues, foundSale);
      await this.updateStock(updateValues);
  
      await this.db.collection(this.table).updateOne(query, values);
    } catch (e) {
      return { code: e.message };
    }
  }

  async Delete(id, sales) {
    try {
      const query = { _id: this.objectId(id) };
      const newValues = updateValuesFromDelete(sales);
      await this.updateStock(newValues);
      
      await this.db.collection(this.table).deleteOne(query);
    } catch (e) {
      return { code: e.message };
    }
  }
}

module.exports = Sales;