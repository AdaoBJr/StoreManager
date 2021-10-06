const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoDB = require('../../models/connection');
const testProd = require('../../models/Products');
const testSale = require('../../models/sales');

const database = new MongoMemoryServer();

const connect = async () => {
    const URL = await database.getUri();
    const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    return MongoClient.connect(URL, OPTIONS);
};

describe('Testing products list', () => {
  describe('Testing products in storage', () => {
    const payload = { name: 'Produto', quantity: 100 };
    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      })

      it('Must be an object', async () => {
        const response = await testProd.selectAll();
        expect(response).to.be.an('object');
      });

      it('Object has "products" property', async () => {
        const response = await testProd.selectAll();
        expect(response).to.have.property('products');
      });

      it('"products" property is an array', async () => {
        const { products } = await testProd.selectAll();
        expect(products).to.be.an('array');
      });

      it('array of objects', async () => {
        const { products } = await testProd.selectAll();
        expect(products[0]).to.include.an('object')
      });

      it('object has the properties: "_id", "name", "quantity"', async () => {
        const { products } = await testProd.selectAll();
        expect(products[0]).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('inexistent prod', () => {
    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('products').deleteMany({});
      });

      after(() => {
        MongoClient.connect.restore();
      })

      it('expects to return an object', async () => {
        const response = await testProd.selectAll();
        expect(response).to.be.an('object');
      });

      it('object must have "products" property', async () => {
        const response = await testProd.selectAll();
        expect(response).to.have.property('products');
      });

      it('property must be an array', async () => {
        const { products } = await testProd.selectAll();
        expect(products).to.be.an('array');
      });

      it('array must be empty', async () => {
        const { products } = await testProd.selectAll();
        expect(products).to.be.empty;
      });
    });
  })
});

describe('Search product by name', () => {
  describe('Expecting product to exist', () => {
    const payload = { name: 'Produto', quantity: 100 };
    describe('response', () => {

      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Expects object', async () => {
        const response = await testProd.findByName(payload.name);
        expect(response).to.be.an('object');
      });

      it('Must contain "_id", "name", "quantity"', async () => {
        const response = await testProd.findByName(payload.name);
        expect(response).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const payload = { name: 'Produto', quantity: 100 };
    describe('response', () => {

      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('products').deleteMany({});
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Expects null', async () => {
        const response = await testProd.findByName(payload.name);
        expect(response).to.be.null;
      });
    });
  });
});

describe('Product by ID', () => {
  describe('Expects product to exist', () => {
    const payload = { name: 'Produto', quantity: 100 };

    describe('response', () => {
      let response;
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        response = await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(async () => {
        MongoClient.connect.restore();
      });

      it('Expect object', async () => {
        const ret = await testProd.selectById(response.insertedId);
        expect(ret).to.be.an('object');
      });

      it('Must contain "_id", "name", "quantity"', async () => {
        const ret = await testProd.selectById(response.insertedId);
        expect(ret).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Expect to fail', () => {
    const mockID = "4216d615516b0bf9168afc23";
    const payload = { name: 'Produto', quantity: 100 };

    describe('response', () => {
      let ret;
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        ret = await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testProd.selectById(mockID);
        expect(ret).to.be.null;
      });
    });
  });

  describe('Expects to fail', () => {
    const mockID = "61409dcc05";

    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      after(() => {
        ObjectId.isValid.restore();
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testProd.selectById(mockID);
        expect(ret).to.be.null;
      });
    });
  });
});

describe('Testing prod insertion', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };

    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      })

      it('Expects object', async () => {
        const ret = await testProd.createProd(payload);
        expect(ret).to.be.an('object');
      });

      it('Must have "_id", "name" e "quantity"', async () => {
        const ret = await testProd.createProd(payload);
        expect(ret).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const payload = { texto: 'Produto', qtt: 100 };

    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
      });

      after(() => {
        MongoClient.connect.restore();
      })

      it('Must be an object', async () => {
        const response = await testProd.createProd(payload);
        expect(response).to.be.null;
      });
    });
  });
});

describe('Testing update', () => {
  describe('Expects sucess', () => {
    const payload = { name: 'Prod', quantity: 100 };
    const update = { name: 'Produto', quantity: 1000 };

    describe('response', () => {
      let result;
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        result = await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Must be an object', async () => {
        const ret = await testProd.updateProd(result.insertedId, update.name, update.quantity);
        expect(ret).to.be.an('object');
      });

      it('Must have "_id", "name", "quantity"', async () => {
        const ret = await testProd.updateProd(result.insertedId, update.name, update.quantity);
        expect(ret).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const payload = { name: 'Prod', quantity: 100 };
    const update = { name: 'Produto', quantity: 1000 };
    const invalidId = '123456'
    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      })

      it('Must be null', async () => {
        const ret = await testProd.updateProd(invalidId, update.name, update.quantity);
        expect(ret).to.be.null;
      });
    })
  });

  describe('Expects invalid ID', () => {
    const payload = { name: 'Prod', quantity: 100 };
    const update = { name: 'Produto', quantity: 1000 };
    const invalidId = '123456'

    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      after(() => {
        ObjectId.isValid.restore();
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testProd.updateProd(invalidId, update.name, update.quantity);
        expect(ret).to.be.null;
      });
    });
  });
});

describe('Expects prod deletion', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };
    describe('response', () => {
      let ret;

      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        ret = await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Must have "_id", "name" e "quantity', async () => {
        const response = await testProd.deleteProd(result.insertedId);
        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('_id', 'name', 'quantity');
      });
    })
  });

  describe('Expects to fail', () => {
    const payload = { name: 'Produto', quantity: 100 };
    const invalidId = '123456';
    describe('response', () => {
      let ret;

      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        ret = await mockConn.db('StoreManager').collection('products').insertOne(payload);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testProd.deleteProd(invalidId);
        expect(ret).to.be.null;
      });
    })
  });
});

describe('Expects sales list', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };
    let mockConn;
    let product;
    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
        const sale = [{ productId: product.insertedId, quantity: 100 }];
        await mockConn.db('StoreManager').collection('sales').insertOne({ sale });
      });

      after(async () => {
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Expects an object', async () => {
        const ret = await testSale.allSales();
        expect(ret).to.be.an('object');
      });

      it('Must have "sales"', async () => {
        const ret = await testSale.allSales();
        expect(ret).to.have.property('sales');
      });

      it('Must be an array', async () => {
        const { sales } = await testSale.allSales();
        expect(sales).to.be.an('array');
      });

      it('Must conatain an object', async () => {
        const { sales } = await testSale.allSales();
        expect(sales[0]).to.include.an('object')
      });

      it('Must have "_id", "sale"', async () => {
        const { sales } = await testSale.allSales();
        expect(sales[0]).to.have.all.keys('_id', 'sale');
      });
    });
  });

  describe('Expect to fail', () => {
    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
      });

      after(() => {
        MongoClient.connect.restore();
      })

      it('Must be an object', async () => {
        const ret = await testSale.allSales();
        expect(ret).to.be.an('object');
      });

      it('Must have "sales"', async () => {
        const ret = await testSale.allSales();
        expect(ret).to.have.property('sales');
      });

      it('Must be an array', async () => {
        const { sales } = await testSale.allSales();
        expect(sales).to.be.an('array');
      });

      it('Must be empty', async () => {
        const { sales } = await testSale.allSales();
        expect(sales).to.be.empty;
      });
    });
  });
});

describe('Searches sales by ID', () => {
  describe('Expects sucess', () => {
    const payload = { name: 'Produto', quantity: 100 };
    let mockConn;
    let product;
    let newSale;

    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
        const mockSale = [{ productId: product.insertedId, quantity: 100 }];
        newSale = await mockConn.db('StoreManager').collection('sales').insertOne({ sale: mockSale });
      });

      after(async () => {
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Must be an object', async () => {
        const ret = await testSale.selectById(newSale.insertedId);
        expect(ret).to.be.an('object');
      });

      it('Must have "_id", "sale"', async () => {
        const ret = await testSale.selectById(newSale.insertedId);
        expect(ret).to.have.all.keys('_id', 'sale');

      });

      it('"_id" must match sales ID', async () => {
        const { _id } = await testSale.selectById(newSale.insertedId);
        expect(_id).to.be.deep.equal(newSale.insertedId);
      })

      it('"sale" must be an array', async () => {
        const ret = await testSale.selectById(newSale.insertedId);
        expect(ret.sale).to.be.an('array');
      });

      it('Must have "productId", "quantity"', async () => {
        const { sale } = await testSale.selectById(newSale.insertedId);
        expect(sale[0]).to.be.an('object');
        expect(sale[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const mockFailID = "4f5c68335e0d6dd140d6ab9d"
    let mockConn;

    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
      });

      after(() => {
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testSale.selectById(mockFailID);
        expect(ret).to.be.null;
      });
    });
  });

  describe('Expects to fail', () => {
    const fakeID = "09d5cc0614";

    describe('response', () => {
      before(async () => {
        const mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      after(() => {
        ObjectId.isValid.restore();
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testSale.selectById(fakeID);
        expect(ret).to.be.null;
      });
    });
  });
});

describe('Testing new sales', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };
    let mockConn;
    let product;
    let newSale;
    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
        newSale = [{ productId: product.insertedId, quantity: 100 }];
      });

      after(async () => {
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
        await mockConn.db('StoreManager').collection('products').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Must be an object', async () => {
        const ret = await testSale.newSale(newSale);
        expect(ret).to.be.an('object');
      });

      it('Must have "itensSold", "_id"', async () => {
        const ret = await testSale.newSale(newSale);
        expect(ret).to.have.all.keys('itensSold', '_id');
      });

      it('Must contain an object', async () => {
        const { itensSold } = await testSale.newSale(newSale);
        expect(itensSold).to.be.an('array');
        expect(itensSold[0]).to.be.an('object');
      });

      it('Must have "productId", "quantity"', async () => {
        const { itensSold } = await testSale.newSale(newSale);
        expect(itensSold[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });
});

describe('Testing sale update', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };
    let mockConn;
    let product;
    let updatedSale;
    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
        updatedSale = [{ productId: product.insertedId, quantity: 100 }];
      });

      after(async () => {
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
        await mockConn.db('StoreManager').collection('products').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Must be an object', async () => {
        const ret = await testSale.saleUpdate(product.insertedId, updatedSale);
        expect(ret).to.be.an('object');
      });

      it('Must contain "_id", "itensSold"', async () => {
        const ret = await testSale.saleUpdate(product.insertedId, updatedSale);
        expect(ret).to.have.all.keys('_id', 'itensSold');
      });

      it('Must be an array', async () => {
        const { itensSold } = await testSale.saleUpdate(product.insertedId, updatedSale);
        expect(itensSold).to.be.an('array');
      });

      it('Must have an object', async () => {
        const { itensSold } = await testSale.saleUpdate(product.insertedId, updatedSale);
        expect(itensSold[0]).to.be.an('object');
      });

      it('Must have "productId", "quantity"', async () => {
        const { itensSold } = await testSale.saleUpdate(product.insertedId, updatedSale);
        expect(itensSold[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const fakeID = '123456';
    let mockConn;

    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      after(async() => {
        ObjectId.isValid.restore();
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testSale.saleUpdate(fakeID);
        expect(ret).to.be.null;
      });
    });
  });
});

describe('Testing sale deletion', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };
    let mockConn;
    let product;
    let newSale;
    describe('response', () => {
      beforeEach(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
        const mockSale = [{ productId: product.insertedId, quantity: 100 }];
        newSale = await mockConn.db('StoreManager').collection('sales').insertOne({ sales: mockSale });
      });

      afterEach(async () => {
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
        await mockConn.db('StoreManager').collection('products').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Must be an object', async () => {
        const ret = await testSale.saleDelete(newSale.insertedId);
        expect(ret).to.be.an('object');
      });

      it('Must have "_id", "sales"', async () => {
        const ret = await testSale.saleDelete(newSale.insertedId);
        expect(ret).to.have.all.keys('_id', 'sales');
      });

      it('Must be an array', async () => {
        const { sales } = await testSale.saleDelete(newSale.insertedId);
        expect(sales).to.be.an('array');
      });

      it('Must have "productId", "quantity"', async () => {
        const { sales } = await testSale.saleDelete(newSale.insertedId);
        expect(sales[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const fakeID = '123456';
    let mockConn;

    describe('response', () => {
      before(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      after(async() => {
        ObjectId.isValid.restore();
        MongoClient.connect.restore();
      });

      it('Must be null', async () => {
        const ret = await testSale.saleDelete(fakeID);
        expect(ret).to.be.null;
      });
    });
  });
});

describe('Testing storage', () => {
  describe('Expects success', () => {
    const payload = { name: 'Produto', quantity: 100 };
    let mockConn;
    let product;
    let newSale;
    let mockStock;
    describe('response', () => {
      beforeEach(async () => {
        mockConn = await connect();
        sinon.stub(MongoClient, 'connect').resolves(mockConn);
        product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
        const mockSale = [{ productId: product.insertedId, quantity: 100 }];
        newSale = await mockConn.db('StoreManager').collection('sales').insertOne({ sales: mockSale });
        mockStock = newSale.ops[0].sales[0].quantity;
      });

      afterEach(async () => {
        await mockConn.db('StoreManager').collection('sales').deleteMany({});
        await mockConn.db('StoreManager').collection('products').deleteMany({});
        MongoClient.connect.restore();
      });

      it('Must be an object', async () => {
        const ret = await testSale.salesStock(product.insertedId, mockStock);
        expect(ret).to.be.an('object');
      });

      it('Must have "modifiedCount"', async () => {
        const ret = await testSale.salesStock(product.insertedId, mockStock);
        expect(ret).to.have.property('modifiedCount');
      });

      it('"modifiedCount" must be "1"', async () => {
        const ret = await testSale.salesStock(product.insertedId, mockStock);
        expect(ret.modifiedCount).to.be.equal(1);
      });
    });
  });

  describe('Expects to fail', () => {
    describe('No more left on stock', () => {
      const payload = { name: 'Produto', quantity: 100 };
      let mockConn;
      let product;
      let newSale;
      let mockStock;
      describe('response', () => {
        before(async () => {
          mockConn = await connect();
          sinon.stub(MongoClient, 'connect').resolves(mockConn);
          product = await mockConn.db('StoreManager').collection('products').insertOne(payload);
          const mockSale = [{ productId: product.insertedId, quantity: 100 }];
          newSale = await mockConn.db('StoreManager').collection('sales').insertOne({ sales: mockSale });
          mockStock = newSale.ops[0].sales[0].quantity;
        });

        after(async () => {
          await mockConn.db('StoreManager').collection('sales').deleteMany({});
          await mockConn.db('StoreManager').collection('products').deleteMany({});
          MongoClient.connect.restore();
        });

        it('Must be null', async () => {
          const ret = await testSale.salesStock(product.insertedId, 1000);
          expect(ret).to.be.null;
        });
      });
    });
  });
});

describe('Testing mongoDB connection', () => {
  describe('Expects success', () => {
    describe('response', () => {

      it('Promise me its a promise', () => {
        const ret = mongoDB();
        expect(ret).to.be.a('Promise');
      });
    });
  });

  describe('Expects to fail', () => {
    describe('response', () => {
      beforeEach(async () => {

        sinon.stub(MongoClient, 'connect').throws()
      });

      afterEach(() => {
        MongoClient.connect.restore();

      });

      it('Expects to fail', async () => {
        const ret = await mongoDB();
        expect(() => ret.catch((err) => err)).to.be.a('function');
      });
    });
  });
});
