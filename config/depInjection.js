const { ObjectID } = require('mongodb');
const { ProductsController, SalesController } = require('../controllers');
const { connection } = require('../infraestructure/database/connection');
const { errorBuilder } = require('../middleware');
const { Product, ProductSerializer, Sales, SalesSerializer } = require('../models');
const { codes, messages } = require('../schemas');
const { ProductService, SalesService } = require('../services');

const injectDep = async () => {
  const db = await connection();

  const product = new Product(db, new ProductSerializer(), ObjectID);
  const serviceProduct = new ProductService(product, errorBuilder, codes, messages);
  const productController = new ProductsController(serviceProduct);

  const sales = new Sales(db, product, new SalesSerializer(), ObjectID);
  const salesService = new SalesService({ product, sales, messages, codes, errorBuilder });
  const salesController = new SalesController(salesService);

  return { productController, salesController };
};

const controllerProduct = injectDep();
module.exports = controllerProduct;