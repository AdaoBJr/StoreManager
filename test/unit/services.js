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

});