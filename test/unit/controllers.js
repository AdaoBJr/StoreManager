const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController')
const salesController = require('../../controllers/salesController')
const salesService = require('../../services/salesService')
const productService = require('../../services/productsService')

describe('Verifica se retorna as informações corretas ao criar produto', () => {
  const res = {};
  const req = {};
  
  before(async () => {
    req.body = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'validateProduct').resolves('Invalid payload');
  })

  after(() => {
    productService.validateProduct.restore();
  });

  it('Quando o payload é inválido', async () => {
    await productController.createNewProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true);
  })

})

describe('Quando o payload é válido', async () => {
  const req = {};
  const res = {};

  before(() => {
    req.body = {
      name: 'UmProduto',
      quantity: 100,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'createNewProduct').resolves({
      _id: '604cb554311d68f491ba5781',
      name: 'UmProduto',
      quantity: 100,
    });
  });

  after(() => {
    productService.createNewProduct.restore();
  });

  it('Quando o payload é válido', async () => {
    await productController.createNewProduct(req, res)

    expect(res.status.calledWith(201)).to.be.equal(true);
  })
})

describe('Testa a consulta aos produtos no productController', () => {
  describe('Busca apenas um produto', () => {
    const req = {};
    const res = {};
    const fakeValidId = '615495794851a62068f4da07'
  
    before(() => {
      req.params = {
        _id: 'InvalidID'
      };
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getProductById').resolves({
        _id: fakeValidId,
        name: "Product1",
        quantity: 100,
      })
    });

    after(() => {
      productService.getProductById.restore();
    });

    it('Se o _id for inválido, retorna um erro', async () => {
      await productController.getOneProduct(req, res)

      expect(res.status.calledWith(422)).to.be.equal(true);
    })
  
    it('Se o produto existe, retorna o produto', async () => {
      req.params = { id: '615495794851a62068f4da07' };

      await productController.getOneProduct(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })

  describe('Busca todos os produtos no db', () => {
    const req = {};
    const res = {};
  
    before(() => {
      req.body = {};
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'getAllProducts').resolves({
        products: [
          {
            _id: "validId",
            name: "Product One",
            quantity: 100,
          },
          {
            _id: "validId2",
            name: "Product Two",
            quantity: 10,
          }
        ]
      })
    });

    after(() => {
      productService.getAllProducts.restore();
    });

    it('Retorna todos os produtos', async () => {
      await productController.getAllProducts(req, res)

      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })

})

describe('Atualiza um produto no db', () => {
  const req = {};
  const res = {};

  const updatedProduct = {
    id: '615495794851a62068f4da07',
    name: "Novo nome",
    Quantity: 325
  }

  beforeEach(() => {
    req.body = { name: updatedProduct.name, quantity: updatedProduct.quantity};
    req.params = { id: updatedProduct.id}

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'updateProduct').resolves(updatedProduct)
  });

  afterEach(() => {
    productService.updateProduct.restore();
  });

  it('Retorna o produto atualizado', async () => {
    await productController.updateProduct(req, res)

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(updatedProduct)).to.be.ok;
  })

  it('Retorna um erro quando o ID está errado', async () => {
    req.params.id = "InvalidID"
    await productController.updateProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true);
  })

  it('Retorna um erro quando a lenght do name é menor que 5', async () => {
    req.body.name = "err"
    await productController.updateProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true);
  })

  it('Retorna um erro quando a quantidade é menor que 1', async () => {
    req.body.quantity = 0
    await productController.updateProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true);
  })

  it('Retorna um erro quando a quantidade é uma string', async () => {
    req.body.quantity = "String"
    await productController.updateProduct(req, res)

    expect(res.status.calledWith(422)).to.be.equal(true);
  })
})

describe('Remove um produto do db', () => {
  describe('Quando ele exite', () => {
    const req = {};
    const res = {};
  
    const product = {
      id: '615495794851a62068f4da07',
      name: "Novo nome",
      Quantity: 325
    }
  
    before(() => {
      req.params = { id: product.id }
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productService, 'validateId').resolves()
      sinon.stub(productService, 'getProductById').resolves(product)
      sinon.stub(productService, 'deleteProduct').resolves(1)
    });
  
    after(() => {
      productService.validateId.restore();
      productService.getProductById.restore();
      productService.deleteProduct.restore();
    });
  
    it('Retorna o produto removido', async () => {
      await productController.deleteProduct(req, res)
  
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(product)).to.be.ok;
    })
  })

  describe('Quando o produto não exite', () => {
    const req = {};
    const res = {};
  
    const product = {
      id: '615495794851a62068f4da07',
      name: "Novo nome",
      Quantity: 325
    }
  
    before(() => {
      req.params = { id: product.id }
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(productService, 'validateId').resolves()
      sinon.stub(productService, 'getProductById').resolves(product)
      sinon.stub(productService, 'deleteProduct').resolves({
        errorMessage: {
          err: {
            code: 'invalid_data',
            message: 'Wrong id format',
          },
        },
      })
    });
  
    after(() => {
      productService.validateId.restore();
      productService.getProductById.restore();
      productService.deleteProduct.restore();
    });
  
    it('Retorna o status 422', async () => {
      await productController.deleteProduct(req, res)
  
      expect(res.status.calledWith(422)).to.be.equal(true);
    })
  })
});

describe('Insere as sales no db na rota /sales', () => {
  describe('Quando um dos produtos está errado', () => {
    const req = {};
    const res = {};
  
    const wrongSalesProducts = [{
      Quantity: 325
    }]
  
    before(() => {
      req.body = { wrongSalesProducts }
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(salesService, 'validateProductsArray').resolves({ errorMessage: { err: { 
        code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }, 
      } })
    });
  
    after(() => {
      salesService.validateProductsArray.restore();
    });
  
    it('Retorna o status 422', async () => {
      await salesController.insertSales(req, res)
  
      expect(res.status.calledWith(422)).to.be.equal(true);
    })
  })

  describe('Quando os produtos estão corretos', () => {
    const req = {};
    const res = {};

    const correctSales = [
      {
        productId: "615634e53519a410a0fbbfd5",
        quantity: 10,
      }
    ]

    const insertedSales = {
      _id: "615634ffbb5b8c47a42ee951",
      itensSold: [
        {
          productId: "615634e53519a410a0fbbfd5",
          quantity: 10,
        }
      ]
    }
  
    before(() => {
      req.body = { correctSales }
  
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
  
      sinon.stub(salesService, 'validateProductsArray').resolves()
      sinon.stub(salesService, 'insertSalesProducts').resolves(insertedSales)
    });
  
    after(() => {
      salesService.validateProductsArray.restore();
      salesService.insertSalesProducts.restore();
    });
  
    it('Retorna o status 422', async () => {
      await salesController.insertSales(req, res)
  
      expect(res.status.calledWith(200)).to.be.equal(true);
    })
  })
})
