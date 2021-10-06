const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsServices');
const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

describe('Testa o productsModel', () => {
  const payloadProduct = {
    name: 'Produto Teste',
    quantity: 10,
  };

  describe('Testa a criação de um produto', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(productsModel, 'create')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      productsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.create(payloadProduct);
      console.log(response);
      expect(response).to.be.a('object');
    })
  });

  describe('Testa a busca por nome', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(productsModel, 'create')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
      sinon.stub(productsModel, 'findByName')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      productsModel.create.restore();
      productsModel.findByName.restore();
    });

    it('retorna o objeto com o nome buscado', async () => {
      await productsService.create(payloadProduct);
      const response = await productsService.findByName('Produto Teste')

      expect(response).to.be.a('object');
      expect(response.name).to.be.equal('Produto Teste');
    })
  });

  describe('Testa a busca por todos os produtos', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(productsModel, 'getAll')
        .resolves({
          products: [{
            id: ID_EXAMPLE,
            name: NAME_EXAMPLE,
            quantity: QTY_EXAMPLE,
          }]
      });
    });

    after(() => {
      productsModel.getAll.restore();
    });

    describe('Testa o retorno', () => {
      it('o retorno é um objeto', async () => {
        const response = await productsService.getAll();

        expect(response).to.be.an('object')
      });

      it('o objeto tem a propriedade "products"', async () => {
        const response = await productsService.getAll();

        expect(response).to.have.property('products');
      });

      it('dentro da propriedade "products" há um array', async () => {
        const response = await productsService.getAll();

        expect(response.products).to.be.an('array');
      });
    })
  });

  describe('Testa a busca por ID', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(productsModel, 'getById')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.getById('604cb554311d68f491ba5781');

      expect(response).to.be.an('object');
      expect(response.id).to.be.equal('604cb554311d68f491ba5781');
    });
  });

  describe('Testa o update ID', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(productsModel, 'updateById')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      productsModel.updateById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.updateById('604cb554311d68f491ba5781', 'Produto Teste', 10);

      expect(response).to.be.an('object');
      expect(response.id).to.be.equal('604cb554311d68f491ba5781');
    });
  });

  describe('Testa o deleteById', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(productsModel, 'deleteById')
        .resolves({
          id: ID_EXAMPLE,
      });
    });

    after(() => {
      productsModel.deleteById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.deleteById('604cb554311d68f491ba5781');

      expect(response).to.be.an('object');
      expect(response.id).to.be.equal('604cb554311d68f491ba5781');
    });
  });
});

describe('Testa o saleService', () => {
  const payloadSale = {
    itensSold:[{
      productId: '604cb554311d68f491ba5781',
      name: 'Produto Teste',
      quantity: 2,
    }]
  };

  describe('Testa a criação de uma venda', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(salesModel, 'create')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: payloadSale.itensSold,
      });
    });

    after(() => {
      salesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.create(payloadSale);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa a busca de uma venda por ID', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(salesModel, 'getById')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: payloadSale.itensSold,
      });
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.getById(payloadSale);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa a atualização da venda', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(salesModel, 'update')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: payloadSale.itensSold,
      });
    });

    after(() => {
      salesModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.update(payloadSale);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa a remoção de uma venda', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(salesModel, 'deleteById')
        .resolves({
          _id: ID_EXAMPLE,
      });
    });

    after(() => {
      salesModel.deleteById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await salesService.deleteById(payloadSale);

      expect(response).to.be.an('object');
    });
  });
});
