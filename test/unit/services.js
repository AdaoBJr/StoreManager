const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

describe.skip('Iniciando testes do modulo productsService', () => {
  describe('Testando a criação de produtos', () => {
    before(() => {
      sinon.stub(productsModel, 'add').resolves((name, quantity) => ({
        name: name,
        quantity: quantity,
        _id: '60e7331efa30b90f51fe8242',
      }));
    });

    after(() => {
      productsModel.add.restore();
    });

    it('O retorno deve ser um objeto', async () => {
      const insertedProduct = await productsService.add();

      expect(insertedProduct('Produto teste', 1000)).to.be.a('object');
    });

    it('Deve possuir as chaves "_id", "name", "quantity"', async () => {
      const insertedProduct = await productsService.add();

      expect(insertedProduct('Produto teste', 1000)).to.include.all.keys('_id', 'name', 'quantity');
    });
  });

  describe('Teste de reconhecimento de produtos', () => {
    let products;

    before(async () => {
      products = await productsService.getAll();

      sinon.stub(productsModel, 'getAll').resolves([
        {
          name: 'Produto 1',
          quantity: 100,
          _id: '60e7331efa30b90f51fe8242',
        },
        {
          name: 'Produto 2',
          quantity: 50,
          _id: '60e7331efa30b90f51fe8243',
        },
      ]);

      sinon.stub(productsModel, 'getById').resolves({
        name: 'Produto 1',
        quantity: 100,
        _id: '60e7331efa30b90f51fe8242',
      });
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('O retorno deve ser um objeto', async () => {
      expect(products).to.be.a('object');
    });

    it('Este objeto deve possuir a chave "products"', async () => {
      expect(products).to.include.keys('products');
    });

    it('Esta chave deve ser deve ser um array', () => {
      expect(products.products).to.be.a('array');
    });

    it('Elementos da chave products devem ser objetos', () => {
      products.products.forEach((product) => expect(typeof product === 'object'));
    });

    it('getById retorna um objeto', async () => {
      const product = await productsService.getById();

      expect(product).to.be.a('object');
    });

    it('getById terá que possuir as chaves "name", "quantity", "_id"', async () => {
      const product = await productsService.getById();

      expect(product).to.include.all.keys('name', 'quantity', '_id');
    });
  });

});