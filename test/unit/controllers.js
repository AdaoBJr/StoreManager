const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController')
const productService = require('../../services/productsService')

describe('Verifica se retorna as informações corretas ao criar produto', () => {
  const res = {};
  const req = {};
  
  before(async () => {
    req.body = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'validateProduct').resolves('Produto inválido');
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
