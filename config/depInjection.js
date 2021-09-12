const { ObjectID } = require('mongodb');
const connection = require('../infraestructure/database/connection');
const { errorBuilder } = require('../middleware');
const { Product, ProductSerializer, Sales, SalesSerializer } = require('../model');
const { codes, messages } = require('../schemas');
const { ProductService, SalesService } = require('../service');

const injectDep = async () => {
  const db = await connection();

  const product = new Product(db, new ProductSerializer(), ObjectID);
  const serviceProduct = new ProductService(product, errorBuilder, codes, messages);

  const sales = new Sales(db, product, new SalesSerializer(), ObjectID);
  const salesService = new SalesService({ product, sales, messages, codes, errorBuilder });

  return { serviceProduct, salesService };
};
const serviceProduct = injectDep();
module.exports = serviceProduct;