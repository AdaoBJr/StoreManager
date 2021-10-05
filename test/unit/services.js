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

  describe('Testando a atualização dos produtos', () => {
    before(() => {
      sinon.stub(productsModel, 'update').resolves({
        name: 'Produto 1',
        quantity: 100,
        _id: '60e7331efa30b90f51fe8242',
      });
    });

    after(() => {
      productsModel.update.restore();
    });

    it('Tem que retornar o mesmo objeto recebido do model', async () => {
      const product = await productsService.update()

      expect(product).to.be.deep.equal({
        name: 'Produto 1',
        quantity: 100,
        _id: '60e7331efa30b90f51fe8242',
      })
    });
  });

  describe('Delete dos produtos', () => {
    before(() => {
      sinon.stub(productsModel, 'remove').resolves({
        name: 'Produto 1',
        quantity: 100,
        _id: '60e7331efa30b90f51fe8242',
      });
    });

    after(() => {
      productsModel.remove.restore();
    });

    it('Tem que retornar o mesmo objeto recebido do model', async () => {
      const product = await productsService.remove()

      expect(product).to.be.deep.equal({
        name: 'Produto 1',
        quantity: 100,
        _id: '60e7331efa30b90f51fe8242',
      })
    });

  });
});


  describe('Teste do modulo salesService', () => {
    describe('Testando a criação de vendas', () => {
      before(() => {
        sinon.stub(salesModel, 'add').resolves([
          {
            quantity: 100,
            productId: '60e7331efa30b90f51fe8242',
          },
          {
            quantity: 50,
            productId: '60e7331efa30b90f51fe8243',
          },
        ]);
      });
  
      after(() => {
        salesModel.add.restore();
      });
  
      it('Deve retornar um array', async () => {
        const itensSold = await salesService.add();
  
        expect(itensSold).to.be.a('array');
      });
  
      it('Elementos do array devm ser objetos', async () => {
        const itensSold = await salesService.add();
  
        itensSold.forEach((item) => expect(item).to.be.a('object'))
      });
  
      it('Elementos do array devem possuir as chaves "quantity" e "productId"', async () => {
        const itensSold = await salesService.add();
  
        itensSold.forEach((item) => expect(item).to.include.all.keys('productId', 'quantity'))
      });
  
    });
  
    describe('Testando a leitura dos produtos', () => {
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
  
      it('Tem que retornar um objeto', async () => {
        expect(products).to.be.a('object');
      });
  
      it('Este objeto deve possuir a chave "products"', async () => {
        expect(products).to.include.keys('products');
      });
  
      it('Esta chave deve ser um array', () => {
        expect(products.products).to.be.a('array');
      });
  
      it('Elementos da chave products devem ser objetos', () => {
        products.products.forEach((product) => expect(typeof product === 'object'));
      });
  
      it('getById tem que retornar um objeto', async () => {
        const product = await productsService.getById();
  
        expect(product).to.be.a('object');
      });
  
      it('getById tem que possuir as chaves "name", "quantity", "_id"', async () => {
        const product = await productsService.getById();
  
        expect(product).to.include.all.keys('name', 'quantity', '_id');
      });
    });
  
    describe('Atualização dos produtos sendo testada', () => {
      before(() => {
        sinon.stub(productsModel, 'update').resolves({
          name: 'Produto 1',
          quantity: 100,
          _id: '60e7331efa30b90f51fe8242',
        });
      });
  
      after(() => {
        productsModel.update.restore();
      });
  
      it('Retornar o mesmo objeto recebido do model', async () => {
        const product = await productsService.update()
  
        expect(product).to.be.deep.equal({
          name: 'Produto 1',
          quantity: 100,
          _id: '60e7331efa30b90f51fe8242',
        })
      });
  
    });
  
    describe('Teste de exclusão dos produtos', () => {
      before(() => {
        sinon.stub(productsModel, 'remove').resolves({
          name: 'Produto 1',
          quantity: 100,
          _id: '60e7331efa30b90f51fe8242',
        });
      });
  
      after(() => {
        productsModel.remove.restore();
      });
  
      it('Retornar o mesmo objeto recebido do model', async () => {
        const product = await productsService.remove()
  
        expect(product).to.be.deep.equal({
          name: 'Produto 1',
          quantity: 100,
          _id: '60e7331efa30b90f51fe8242',
        })
      });
  
    });
  });
// teste github ainda com problemas
