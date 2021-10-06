const sinon = require('sinon');
const { expect } = require('chai');
const { ObjectId } = require('mongodb');

const productsModel = require('../../models/Products');
const salesModel = require('../../models/sales');
const productsService = require('../../services/Products');
const salesService = require('../../services/Sales');

describe('Products on stock', () => {
  describe('Expects success', () => {
    describe('response', () => {
      const res = {
        products: [
          {
            _id: "4216d615516b0bf9168afc23",
            name: "Produto",
            quantity: 100,
          },
        ],
      };

      beforeEach(() => {
        sinon.stub(productsModel, 'selectAll').resolves(res);
      });

      afterEach(() => {
        productsModel.selectAll.restore();
      });

      it('Must be an obj', async () => {
        const result = await productsService.selectAll();
        expect(result).to.be.an('object');

      });

      it('All products', async () => {
        const result = await productsService.selectAll();
        expect(result).to.be.equal(res)
      });
    });
  });

  describe('Expects to fail', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'selectAll').resolves({ products: [] });
      });

      afterEach(() => {
        productsModel.selectAll.restore();
      });

      it('Must be an obj', async () => {
        const result = await productsService.selectAll();
        expect(result).to.be.an('object');
      });

      it('Must have "products"', async () => {
        const result = await productsService.selectAll();
        expect(result).to.have.property('products');
      });

      it('Array must be empty', async () => {
        const { products } = await productsService.selectAll();
        expect(products).to.be.empty;
      });
    });
  });
});

describe('Product by ID', () => {
  describe('Expects success', () => {
    describe('response', () => {
      const resp = {
        _id: "4216d615516b0bf9168afc23",
        name: "Produto",
        quantity: 100,
      }
      beforeEach(() => {
        sinon.stub(productsModel, 'selectById').resolves(resp)
      });

      afterEach(() => {
        productsModel.selectById.restore();
      });

      it('Must be an obj', async () => {
        const result = await productsService.selectById("4216d615516b0bf9168afc23")
        expect(result).to.be.an('object');
      });

      it('Expects success', async () => {
        const result = await productsService.selectById("4216d615516b0bf9168afc23")
        expect(result).to.be.equal(resp);
      });

      it('Must have "_id", "name" "quantity"', async () => {
        const result = await productsService.selectById("4216d615516b0bf9168afc23")
        expect(result).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Invalid ID', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'selectById').returns(null);
      });

      afterEach(() => {
        productsModel.selectById.restore();
      });

      it('Expects to fail', async () => {
        const result = await productsService.selectById('123').catch((err) => err);
        expect(result).to.be.an('error')
      });

      it('Must have "statusCode"', async () => {
        const result = await productsService.selectById('123').catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

      it('Must have "invalidIdFormat', async () => {
        const { statusCode } = await productsService.selectById().catch((err) => err);
        expect(statusCode).to.be.equal('invalidIdFormat')
      });
    });
  });
});

describe('Testing"updateProd"', () => {
  describe('Expects success', () => {
    describe('response', () => {
      const product = {
        _id: '4216d615516b0bf9168afc23',
        name: 'Produto',
        quantity: 100,
      }
      const updatedProduct = {
        _id: '4216d615516b0bf9168afc23',
        name: 'Produto',
        quantity: 100,
      };

      beforeEach(() => {
        sinon.stub(productsModel, 'updateProd').resolves(updatedProduct);
      });

      afterEach(() => {
        productsModel.updateProd.restore();
      });

      it('Expects an obj', async () => {
        const result = await productsService.updateProd('id', product.name, product.quantity);
        expect(result).to.be.an('object');
      });

      it('Must have "_id", "name" "quantity"', async () => {
        const result = await productsService.updateProd('id', product.name, product.quantity);
        expect(result).to.have.all.keys('_id', 'name', 'quantity');
      });

      it('Obj must match updated obj', async () => {
        const result = await productsService.updateProd('id', product.name, product.quantity);
        expect(result).to.be.equal(updatedProduct);
      });
    });
  });

  describe('Invalid name', () => {
    describe('response', () => {

      it('expects to fail', async () => {
        const result = await productsService.updateProd('id', 'a', 1).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await productsService.updateProd('id', 'a', 1).catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

      it('Must have "invalidName"', async () => {
        const { statusCode } = await productsService.updateProd('id', 'a', 1).catch((err) => err);
        expect(statusCode).to.be.equal('invalidName');
      });
    });
  });

  describe('Must be less than 1', () => {
    describe('response', () => {

      it('Expects to fail', async () => {
        const result = await productsService.updateProd('id', 'productName', 0).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await productsService.updateProd('id', 'productName', 0).catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

      it('Must have "invalidName"', async () => {
        const { statusCode } = await productsService.updateProd('id', 'productName', 0).catch((err) => err);
        expect(statusCode).to.be.equal('invalidQuantity');
      });
    });
  });

  describe('Type mismatch', () => {
    describe('response', () => {

      it('Expects to fail', async () => {
        const result = await productsService.updateProd('id', 'productName', '10').catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await productsService.updateProd('id', 'productName', '10').catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

      it('Must have "invalidName"', async () => {
        const { statusCode } = await productsService.updateProd('id', 'productName', '10').catch((err) => err);
        expect(statusCode).to.be.equal('invalidQuantityType');
      });
    });
  });

  describe('Invalid ID', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      afterEach(() => {
        ObjectId.isValid.restore();
      });

      it('Expects to fail', async () => {
        const result = await productsService.updateProd('id', 'productName', 10).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await productsService.updateProd('id', 'productName', 10).catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

    it('Must have "invalidQuantity"', async () => {
        const { statusCode } = await productsService.updateProd('id', 'productName', 10).catch((err) => err);
        expect(statusCode).to.be.equal('invalidIdFormat');
      });
    });
  });
});

describe('Testing prod deletion', () => {
  describe('Expects success', () => {
    const resp = {
      _id: '614154f052108ab370e85b77',
      name: 'Produto',
      quantity: 1000
    }
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'deleteProd').resolves(resp);
      });

      afterEach(() => {
        productsModel.deleteProd.restore();
      });

      it('Must be an obj', async () => {
        const result = await productsService.deleteProd('614154f052108ab370e85b77');
        expect(result).to.be.an('object');
      });

      it('Obj must match deleted prod', async () => {
        const result = await productsService.deleteProd('614154f052108ab370e85b77');
        expect(result).to.be.equal(resp);
      });

      it('Must have"_id", "name" "quantity"', async () => {
        const result = await productsService.deleteProd('614154f052108ab370e85b77');
        expect(result).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Invalid ID', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      afterEach(() => {
        ObjectId.isValid.restore();
      });

      it('Expects to fail', async () => {
        const result = await productsService.deleteProd('123').catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await productsService.deleteProd('123').catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

    it('Must have "invalidQuantity"', async () => {
        const { statusCode } = await productsService.deleteProd('123').catch((err) => err);
        expect(statusCode).to.be.equal('invalidIdFormat');
      });
    });
  });
});

describe('Testing product creation', () => {
  describe('Expects success', () => {
    const newProduct = {
      _id: '61415781d7aba7c11d050146',
      name: 'Produto',
      quantity: 1000,
    };

    const resp = {
      _id: '61415781d7aba7c11d050146',
      name: 'Produto',
      quantity: 1000,
    }
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'createProd').resolves(resp);
      });

      afterEach(() => {
        productsModel.createProd.restore();
      });

      it('Expects an obj', async () => {
        const result = await productsService.createProd(newProduct);
        expect(result).to.be.an('object');
      });

      it('Object must match new prod', async () => {
        const result = await productsService.createProd(newProduct);
        expect(result).to.be.equal(resp);
      });

      it('Must have"_id", "name" "quantity"', async () => {
        const result = await productsService.createProd(newProduct);
        expect(result).to.have.all.keys('_id', 'name', 'quantity');
      });
    });
  });

  describe('Invalid name', () => {
    const newProduct = { name: '', quantity: 100 };
    describe('response', () => {
      it('Expects to fail', async () => {
        const result = await productsService.createProd(newProduct).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.exist;
      });

      it('"statusCode" must have "invalidName"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.equal('invalidName');
      });
    });
  });

  describe('Quantity as a string', () => {
    const newProduct = { name: 'NewProduct', quantity: '10' };
    describe('response', () => {
      it('Expects to fail', async () => {
        const result = await productsService.createProd(newProduct).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.exist;
      });

      it('"statusCode" must have "invalidQuantityType"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.equal('invalidQuantityType');
      });
    });
  });

  describe('Quantity being less than 1', () => {
    const newProduct = { name: 'NewProduct', quantity: 0 };
    describe('response', () => {
      it('Expects to fail', async () => {
        const result = await productsService.createProd(newProduct).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.exist;
      });

      it('"statusCode" must have "invalidQuantity"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.equal('invalidQuantity');
      });
    });
  });

  describe('Name conflict', () => {
    const alreadyExists = {
      _id: '61415781d7aba7c11d050146',
      name: 'Produto',
      quantity: 1000,
    }

    const newProduct = {
      _id: '61415781d7aba7c11d050146',
      name: 'Produto',
      quantity: 1000,
    }

    describe('response', () => {
      beforeEach(() => {
        sinon.stub(productsModel, 'findByName').resolves(alreadyExists);
      });

      afterEach(() => {
        productsModel.findByName.restore();
      });

      it('Expects to fail', async () => {
        const result = await productsService.createProd(newProduct).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.exist;
      });

      it('"statusCode" must have "alreadyExists"', async () => {
        const { statusCode } = await productsService.createProd(newProduct).catch((err) => err);
        expect(statusCode).to.equal('alreadyExists');
      });
    });
  });
});

describe('Testing sales', () => {
  describe('Sales', () => {
    describe('response', () => {
      const resp = {
        sales: [
          {
            _id: '61415e989c49c0e2ee2c32a6',
            itensSold: [
              {
                productId: '61415781d7aba7c11d050146',
                quantity: 10,
              },
            ],
          },
        ],
      };

      beforeEach(() => {
        sinon.stub(salesModel, 'allSales').resolves(resp);
      });

      afterEach(() => {
        salesModel.allSales.restore();
      });

      it('Must be an obj', async () => {
        const result = await salesService.allSales();
        expect(result).to.be.an('object');

      });

      it('Must have "sales"', async () => {
        const result = await salesService.allSales();
        expect(result).to.have.property('sales');
      });

      it('All sales', async () => {
        const result = await salesService.allSales();
        expect(result).to.be.equal(resp)
      });
    });
  });

  describe('Expecting no products', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(salesModel, 'allSales').resolves({ sales: [] });
      });

      afterEach(() => {
        salesModel.allSales.restore();
      });

      it('Must be an obj', async () => {
        const result = await salesService.allSales();
        expect(result).to.be.an('object');
      });

      it('Must have "sales"', async () => {
        const result = await salesService.allSales();
        expect(result).to.have.property('sales');
      });

      it('Array must be empty', async () => {
        const { sales } = await salesService.allSales();
        expect(sales).to.be.empty;
      });
    });
  });
});

describe('Product by ID', () => {
  describe('Expects success', () => {
    describe('response', () => {
      const resp = {
        _id: '614160b4109145ec555b8426',
        itensSold: [
          {
            productId: '614160ab109145ec555b8425',
            quantity: 10,
          },
        ],
      };

      beforeEach(() => {
        sinon.stub(salesModel, 'selectById').resolves(resp)
      });

      afterEach(() => {
        salesModel.selectById.restore();
      });

      it('Must be an object', async () => {
        const result = await salesService.selectById('14160b4109145ec555b8426');
        expect(result).to.be.an('object');
      });

      it('Must have sale in obj', async () => {
        const result = await salesService.selectById('14160b4109145ec555b8426');
        expect(result).to.be.equal(resp);
      });

      it('Must have "_id", "itensSold"', async () => {
        const result = await salesService.selectById('14160b4109145ec555b8426');
        expect(result).to.have.all.keys('_id', 'itensSold');
      });

      it('Must be an array', async () => {
        const { itensSold } = await salesService.selectById('14160b4109145ec555b8426');
        expect(itensSold).to.be.an('array');
      });

      it('Must have "productId" "quantity"', async () => {
        const { itensSold } = await salesService.selectById('14160b4109145ec555b8426');
        expect(itensSold[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });

  describe('Invalid ID', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      afterEach(() => {
        ObjectId.isValid.restore();
      });

      it('Expects to fail', async () => {
        const result = await salesService.selectById('123').catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await salesService.selectById('123').catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

      it('Must have "saleNotFound', async () => {
        const { statusCode } = await salesService.selectById('123').catch((err) => err);
        expect(statusCode).to.be.equal('saleNotFound')
      });
    });
  });
});

describe('Testing a new sale', () => {
  describe('Expects success', () => {
    const newSale = [
      {
        productId: '614160ab109145ec555b8425',
        quantity: 10,
      },
    ];

    const resp = {
      itensSold: [
        {
          productId: '614160ab109145ec555b8425',
          quantity: 10,
        },
      ],
      _id: '614162f012c7a6f7795bc5d1',
    };

    describe('response', () => {
      beforeEach(() => {
        sinon.stub(salesModel, 'newSale').resolves(resp);
        sinon.stub(salesModel, 'salesStock').returns({})
      });

      afterEach(() => {
        salesModel.salesStock.restore();
        salesModel.newSale.restore();
      });

      it('Must be an obj', async () => {
        const result = await salesService.newSale(newSale);
        expect(result).to.be.an('object');
      });

      it('Obj must be a registered sale', async () => {
        const result = await salesService.newSale(newSale);
        expect(result).to.equal(resp);
      });

      it('Must have "itensSold" "_id"', async () => {
        const result = await salesService.newSale(newSale);
        expect(result).to.have.all.keys('_id', 'itensSold');
      });

      it('Must be an array', async () => {
        const { itensSold } = await salesService.newSale(newSale);
        expect(itensSold).to.be.an('array');
      });

      it('Array must have an obj', async () => {
        const { itensSold } = await salesService.newSale(newSale);
        expect(itensSold[0]).to.be.an('object');
      });

      it('Must have "productId" "quantity"', async () => {
        const { itensSold } = await salesService.newSale(newSale);
        expect(itensSold[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });

  describe('Sale must update storage count', () => {
    const newSale = [
      {
        productId: '614160ab109145ec555b8425',
        quantity: 10,
      },
    ];

    const resp = {
      itensSold: [
        {
          productId: '614160ab109145ec555b8425',
          quantity: 10,
        },
      ],
      _id: '614162f012c7a6f7795bc5d1',
    };

    describe('response', () => {
      beforeEach(() => {
        sinon.stub(salesModel, 'salesStock').resolves({ modifiedCount: 1 })
        sinon.stub(salesModel, 'newSale').resolves(resp);
      });

      afterEach(() => {
        salesModel.newSale.restore();
        salesModel.salesStock.restore();
      });

      it('Must be an object', async () => {
        const result = await salesService.newSale(newSale);
        expect(result).to.be.an('object');
      });

      it('Obj must match sale', async () => {
        const result = await salesService.newSale(newSale);
        expect(result).to.be.equal(resp);
      });

      it('Must have "itensSold" "_id"', async () => {
        const result = await salesService.newSale(newSale);
        expect(result).to.have.all.keys('_id', 'itensSold');
      });

      it('Must be an array', async () => {
        const { itensSold } = await salesService.newSale(newSale);
        expect(itensSold).to.be.an('array');
      });

      it('Must have an obj', async () => {
        const { itensSold } = await salesService.newSale(newSale);
        expect(itensSold[0]).to.be.an('object');
      });

      it('Must have "productId" "quantity"', async () => {
        const { itensSold } = await salesService.newSale(newSale);
        expect(itensSold[0]).to.have.all.keys('productId', 'quantity');
      });
    });
  });

  describe('Expects to fail', () => {
    const newSale = [
      {
        productId: '614160ab109145ec555b8425',
        quantity: 10,
      },
    ];
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(salesModel, 'salesStock').resolves(null)
      });

      afterEach(() => {
        salesModel.salesStock.restore();
      });
      it('Expects to fail', async () => {
        const result = await salesService.newSale(newSale).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have"statusCode"', async () => {
        const { statusCode } = await salesService.newSale(newSale).catch((err) => err);
        expect(statusCode).to.exist;
      });

      it('"statusCode" Must have "stockProblem"', async () => {
        const { statusCode } = await salesService.newSale(newSale).catch((err) => err);
        expect(statusCode).to.equal('stockProblem');
      });
    });
  });

  describe('Invalid quantity', () => {
    const newSale = [
      {
        productId: '614160ab109145ec555b8425',
        quantity: 0,
      },
    ];

    describe('response', () => {
      it('Expects error', async () => {
        const result = await salesService.newSale(newSale).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const { statusCode } = await salesService.newSale(newSale).catch((err) => err);
        expect(statusCode).to.exist;
      });

      it('"statusCode" must have "invalidSale"', async () => {
        const { statusCode } = await salesService.newSale(newSale).catch((err) => err);
        expect(statusCode).to.equal('invalidSale');
      });
    });
  });
});

describe('Testing sales update', () => {
  describe('Expecting success', () => {
    describe('response', () => {
      const newSale = [{
        productId: '4216d615516b0bf9168afc23',
        quantity: 100,
      }];

      const resp = {
        _id: '614160b4109145ec555b8426',
        itensSold: [
          {
            productId: '6140fd5080d16d1aed89az',
            quantity: 100,
          },
        ],
      };

      beforeEach(() => {
        sinon.stub(salesModel, 'saleUpdate').resolves(resp);
      });

      afterEach(() => {
        salesModel.saleUpdate.restore();
      });

      it('Must be an object', async () => {
        const result = await salesService.saleUpdate('id', newSale);
        expect(result).to.be.an('object');
      });

      it('Must have "_id" "itensSold"', async () => {
        const result = await salesService.saleUpdate('id', newSale);
        expect(result).to.have.all.keys('_id', 'itensSold');
      });

      it('Obj must match prod', async () => {
        const result = await salesService.saleUpdate('id', newSale);
        expect(result).to.be.equal(resp);
      });
    });
  });

  describe('Invalid ID', () => {
    describe('response', () => {
      const newSale = [{
        productId: '4216d615516b0bf9168afc23',
        quantity: 100,
      }];

      beforeEach(() => {
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      afterEach(() => {
        ObjectId.isValid.restore();
      });

      it('Must be null', async () => {
        const result = await salesService.saleUpdate('id', newSale);
        expect(result).to.be.null;
      });
    });
  });

  describe('Invalid quantity', () => {
    describe('response', () => {
      const newSale = [{
        productId: '4216d615516b0bf9168afc23',
        quantity: 0,
      }];

      it('Expect to fail', async () => {
        const result = await salesService.saleUpdate('id', newSale).catch((err) => err);
        expect(result).to.be.an('error');
      });

      it('Must have "statusCode"', async () => {
        const result = await salesService.saleUpdate('id', newSale).catch((err) => err);
        expect(result).to.have.property('statusCode');
      });

      it('"statusCode" must have "invalidSale"', async () => {
        const { statusCode } = await salesService.saleUpdate('id', newSale).catch((err) => err);
        expect(statusCode).to.be.equal('invalidSale');
      });
    });
  });

  describe('Testing stock update', () => {
    describe('Expects success', () => {
      describe('response', () => {
        beforeEach(() => {
          sinon.stub(salesModel, 'salesStock').resolves({ _id: '123', name: 'Teste', quantity: 100 });
        });

        afterEach(() => {
          salesModel.salesStock.restore();
        });

        it('Must be a promise', async () => {
          const result = await salesService.updateStock([{ productId: '614160ab109145ec555b8425' , quantity: 100 }]);
          expect(result).to.be.an('array');
        });
      });
    });

    describe('Expects to fail', () => {
      describe('response', () => {
        beforeEach(() => {
          sinon.stub(salesModel, 'salesStock').resolves(false);
        });

        afterEach(() => {
          salesModel.salesStock.restore();
        });

        it('Expects to fail', async () => {
          const result = await salesService
            .updateStock(
              [{ productId: '614160ab109145ec555b8425' , quantity: 100 }]
            ).catch((err) => err);
          expect(result).to.be.an('error');
        });
      });
    });
  });
});

describe('Deleting sales', () => {
  describe('Expect success', () => {
    const resp = {
      _id: '614177d2759bd24939c2059c',
      itensSold: [
        {
          productId: '614177c3759bd24939c2059b',
          quantity: 10,
        },
      ],
    };
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(salesModel, 'saleDelete').resolves(resp);
        sinon.stub(salesModel, 'selectById').returns(resp);
        sinon.stub(salesModel, 'salesStock').resolves(true)
      });

      afterEach(() => {
        salesModel.salesStock.restore();
        salesModel.selectById.restore();
        salesModel.saleDelete.restore();
      });

      it('Must be an object', async () => {
        const result = await salesService.saleDelete('614177d2759bd24939c2059c');
        expect(result).to.be.an('object');
      });

      it('Object must match deleted sale', async () => {
        const result = await salesService.saleDelete('614177d2759bd24939c2059c');
        expect(result).to.be.equal(resp);
      });

      it('Must have "_id" "itensSold"', async () => {
        const result = await salesService.saleDelete('614177d2759bd24939c2059c');
        expect(result).to.have.all.keys('_id', 'itensSold');
      });
    });
  });

  describe('Invalid ID', () => {
    describe('response', () => {
      beforeEach(() => {
        sinon.stub(salesModel, 'selectById').resolves(false);
        sinon.stub(ObjectId, 'isValid').returns(false);
      });

      afterEach(() => {
        salesModel.selectById.restore();
        ObjectId.isValid.restore();
      });

      it('Expects to fail', async () => {
        const result = await salesService.saleDelete('614177d2759bd24939c2059c').catch((err) => err);
        expect(result).to.be.an('error');
      });
    });
  });
});