const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../models/productsModel');
const ProductsService = require('../../services/productServices');
const SalesModel = require('../../models/salesModel');
const SalesService = require('../../services/salesService');

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

      sinon.stub(ProductsModel, 'create')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      ProductsModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsService.create(payloadProduct);
      console.log(response);
      expect(response).to.be.a('object');
    })
  });

  describe('Testa a busca por nome', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(ProductsModel, 'create')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
      sinon.stub(ProductsModel, 'findByName')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      ProductsModel.create.restore();
      ProductsModel.findByName.restore();
    });

    it('retorna o objeto com o nome buscado', async () => {
      await ProductsService.create(payloadProduct);
      const response = await ProductsService.findByName('Produto Teste')
      
      expect(response).to.be.a('object');
      expect(response.name).to.be.equal('Produto Teste');
    })
  });

  describe('Testa a busca por todos os produtos', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(ProductsModel, 'getAll')
        .resolves({
          products: [{
            id: ID_EXAMPLE,
            name: NAME_EXAMPLE,
            quantity: QTY_EXAMPLE,
          }]
      });
    });

    after(() => {
      ProductsModel.getAll.restore();
    });

    describe('Testa o retorno', () => {
      it('o retorno é um objeto', async () => {
        const response = await ProductsService.getAll();

        expect(response).to.be.an('object')
      });

      it('o objeto tem a propriedade "products"', async () => {
        const response = await ProductsService.getAll();

        expect(response).to.have.property('products');
      });

      it('dentro da propriedade "products" há um array', async () => {
        const response = await ProductsService.getAll();

        expect(response.products).to.be.an('array');
      });
    })
  });

  describe('Testa a busca por ID', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(ProductsModel, 'getById')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      ProductsModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsService.getById('604cb554311d68f491ba5781');

      expect(response).to.be.an('object');
      expect(response.id).to.be.equal('604cb554311d68f491ba5781');
    });
  });

  describe('Testa o update ID', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';
      const NAME_EXAMPLE = 'Produto Teste';
      const QTY_EXAMPLE = 10;

      sinon.stub(ProductsModel, 'updateById')
        .resolves({
          id: ID_EXAMPLE,
          name: NAME_EXAMPLE,
          quantity: QTY_EXAMPLE,
      });
    });

    after(() => {
      ProductsModel.updateById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsService.updateById('604cb554311d68f491ba5781', 'Produto Teste', 10);

      expect(response).to.be.an('object');
      expect(response.id).to.be.equal('604cb554311d68f491ba5781');
    });
  });

  describe('Testa o deleteById', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(ProductsModel, 'deleteById')
        .resolves({
          id: ID_EXAMPLE,
      });
    });

    after(() => {
      ProductsModel.deleteById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsService.deleteById('604cb554311d68f491ba5781');

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

      sinon.stub(SalesModel, 'create')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: payloadSale.itensSold,
      });
    });

    after(() => {
      SalesModel.create.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.create(payloadSale);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa a busca de uma venda por ID', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(SalesModel, 'getById')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: payloadSale.itensSold,
      });
    });

    after(() => {
      SalesModel.getById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.getById(payloadSale);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa a atualização da venda', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(SalesModel, 'update')
        .resolves({
          _id: ID_EXAMPLE,
          itensSold: payloadSale.itensSold,
      });
    });

    after(() => {
      SalesModel.update.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.update(payloadSale);

      expect(response).to.be.an('object');
    });
  });

  describe('Testa a remoção de uma venda', () => {
    before(() => {
      const ID_EXAMPLE = '604cb554311d68f491ba5781';

      sinon.stub(SalesModel, 'deleteById')
        .resolves({
          _id: ID_EXAMPLE,
      });
    });

    after(() => {
      SalesModel.deleteById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await SalesService.deleteById(payloadSale);

      expect(response).to.be.an('object');
    });
  });
});