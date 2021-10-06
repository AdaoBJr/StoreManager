const { expect } = require('chai');
const sinon = require('sinon');

const mockId = '604cb554311d68f491ba5781';

const productsController = require('../../controllers/productsController');
const productsService = require('../../services/productsService');

describe('products controller test', () => {
  describe('ao chamar o controller getAll', () => {
    it('getAll controller responde corretamente', async () => {
      const res = {}
      const req = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockProducts = [{
        _id: mockId,
        name: 'produto',
        quantity: 10
      }]
      sinon.stub(productsService, 'getAll').resolves(mockProducts);

      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ products: mockProducts })).to.be.equal(true);

      productsService.getAll.restore();
    });
  });
  describe('ao chamar o controller getById', () => {
    it('com um id válido', async () => {
      let res = {}
      let req = { params: { id: mockId } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockProduct = {
        _id: mockId,
        name: 'produto',
        quantity: 10
      }
      sinon.stub(productsService, 'getById').resolves(mockProduct);

      await productsController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProduct)).to.be.equal(true);

      productsService.getById.restore();
    });
    it('com um id inválido', async () => {
      let res = {}
      let req = { params: { id: '123456789' } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const idError = {
        code: 'invalid_data',
        message: 'Wrong id format'
      }
      sinon.stub(productsService, 'getById').resolves(idError);

      await productsController.getById(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith({err: idError})).to.be.equal(true);

      productsService.getById.restore();
    });
  });
  describe('ao chamar o controller create', () => {
    it('quando a operação funciona', async () => {
      let res = {}
      let req = { body: {name: 'produto', quantity: 10} }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockProduct = {
        _id: mockId,
        name: 'produto',
        quantity: 10
      }
      sinon.stub(productsService, 'create').resolves(mockProduct);

      await productsController.create(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
      expect(res.json.calledWith(mockProduct)).to.be.equal(true);

      productsService.create.restore();
    });
    it('quando a operação retorna um erro', async () => {
      let res = {}
      let req = { body: {name: 'produto', quantity: 10} }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'mock_error',
        message: 'mock_error_message'
      }
      sinon.stub(productsService, 'create').resolves(error);

      await productsController.create(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      productsService.create.restore();
    });
  })
  describe('ao chamar o controller update', () => {
    it('quando a operação funciona', async () => {
      let res = {}
      let req = {
        body: {name: 'produto', quantity: 10},
        params: { id: mockId }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockProduct = {
        _id: mockId,
        name: 'produto',
        quantity: 10
      }
      sinon.stub(productsService, 'update').resolves(mockProduct);

      await productsController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProduct)).to.be.equal(true);

      productsService.update.restore();
    });
    it('quando a operação retorna um erro', async () => {
      let res = {}
      let req = {
        body: {name: 'produto', quantity: 10},
        params: { id: mockId }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'mock_error',
        message: 'mock_error_message'
      }
      sinon.stub(productsService, 'update').resolves(error);

      await productsController.update(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      productsService.update.restore();
    });
  });
  describe('ao chamar o controller deleteOne', () => {
    it('quando a operação funciona', async () => {
      let res = {};
      let req = { params: { id: mockId } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockProduct = {
        _id: mockId,
        name: 'produto',
        quantity: 10
      }
      sinon.stub(productsService, 'deleteOne').resolves(mockProduct);

      await productsController.deleteOne(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProduct)).to.be.equal(true);

      productsService.deleteOne.restore();
    });
    it('quando a operação retorna um erro', async () => {
      let res = {}
      let req = {
        body: {name: 'produto', quantity: 10},
        params: { id: mockId }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'mock_error',
        message: 'mock_error_message'
      }
      sinon.stub(productsService, 'deleteOne').resolves(error);

      await productsController.deleteOne(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      productsService.deleteOne.restore();
    });
  })
});

const salesController = require('../../controllers/salesController')
const salesService = require('../../services/salesService');

describe('sales controller test', () => {
  describe('ao chamar o controller getAll', () => {
    it('getAll controller responde corretamente', async () => {
      const res = {}
      const req = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      sinon.stub(salesService, 'getAll').resolves(mockSales);

      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith({ sales: mockSales })).to.be.equal(true);

      salesService.getAll.restore();
    });
  });
  describe('ao chamar o controller getById', () => {
    it('com um id válido', async () => {
      let res = {}
      let req = { params: { id: mockId } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const mockSale = {
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }
      sinon.stub(salesService, 'getById').resolves(mockSale);

      await salesController.getById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockSale)).to.be.equal(true);

      salesService.getById.restore();
    });
    it('com um id inválido', async () => {
      let res = {}
      let req = { params: { id: '123456789' } }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const idError = {
        code: 'error_code',
        message: 'error_msg'
      }
      sinon.stub(salesService, 'getById').resolves(idError);

      await salesController.getById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({err: idError})).to.be.equal(true);

      salesService.getById.restore();
    });
  });
  describe('ao chamar o controller create', () => {
    it('quando a operação funciona', async () => {
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      let res = {}
      let req = { body: mockSales }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'create').resolves(mockSales);

      await salesController.create(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockSales)).to.be.equal(true);

      salesService.create.restore();
    });
    it('quando a operação retorna um erro generico', async () => {
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      let res = {}
      let req = { body: mockSales }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'mock_error',
        message: 'mock_error_message'
      }
      sinon.stub(salesService, 'create').resolves(error);

      await salesController.create(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      salesService.create.restore();
    });
    it('quando a operação retorna um erro de estoque', async () => {
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      let res = {}
      let req = { body: mockSales }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'stock_problem',
        message: 'mock_error_message'
      }
      sinon.stub(salesService, 'create').resolves(error);

      await salesController.create(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      salesService.create.restore();
    });
  })
  describe('ao chamar o controller update', () => {
    it('quando a operação funciona', async () => {
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      let res = {}
      let req = {
        body: [{productId: mockId, quantity: 5}],
        params: { id: mockId }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'update').resolves(mockSales);

      await salesController.update(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockSales)).to.be.equal(true);

      salesService.update.restore();
    });
    it('quando a operação retorna um erro generico', async () => {
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      let res = {}
      let req = {
        body: [{productId: mockId, quantity: 5}],
        params: { id: mockId }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'mock_error',
        message: 'mock_error_message'
      }
      sinon.stub(salesService, 'update').resolves(error);

      await salesController.update(req, res);

      expect(res.status.calledWith(422)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      salesService.update.restore();
    });
    it('quando a operação retorna um erro de estoque', async () => {
      const mockSales = [{
        _id: mockId,
        itensSold: [{productId: mockId, quantity: 5}]
      }]
      let res = {}
      let req = {
        body: [{productId: mockId, quantity: 5}],
        params: { id: mockId }
      }
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      const error = {
        code: 'stock_problem',
        message: 'mock_error_message'
      }
      sinon.stub(salesService, 'update').resolves(error);

      await salesController.update(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
      expect(res.json.calledWith({err: error})).to.be.equal(true);

      salesService.update.restore();
    });
  });
  describe('ao chamar o controller deleteOne', () => {
    it('quando a operação funciona', async () => {});
    it('quando a operação retorna um erro', async () => {});
  })
});
