const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const DB_NAME = 'StoreManager';
const COLLECTION_P = 'products';
const COLLECTION_S = 'sales';

const Model = require('../../models');
const getConnection = require('../../models/connectionTest');

const ID_EXAMPLE = '604cb554311d68f491ba5781';

// TESTES PRODUCTS

describe('Cadastro de um novo produto', () => {
  describe('quando é adicionado com sucesso', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto',  () => {
      const response =  Model.products.storeProduct(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto',  () => {
      const response =  Model.products.storeProduct(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado',() => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array',  () => {
      const response =  Model.products.getAllProducts();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('vazio',  () => {
      const response =  Model.products.getAllProducts();

      expect(response.products).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

       connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array',  () => {
      const response =  Model.products.getAllProducts();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('de objetos',  () => {
      const response =  Model.products.getAllProducts();

      expect(response.products[0]).to.be.an('object');

      expect(response.products[0]).to.have.property('_id');
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {
  describe('quando não encontrado', () => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null',  () => {
      const response =  Model.products.getProductsById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrado', () => {
    it('o retorno é um objeto com as informações do produto',  () => {
      const payload = { name: 'Testy, the Tester', quantity: 30 };

      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } =  connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response =  Model.products.getProductsById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('name');

      expect(response).to.have.property('quantity');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de um produto', () => {
  const payload = { name: 'Testy, the Tester', quantity: 30 };

  describe('quando não encontra o produto', () => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "matchedCount" com valor 0',  () => {
      const response =  Model.products.updatedProduct(ID_EXAMPLE, payload);

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const updatedPayload = { name: 'Testy, the Tester', quantity: 45 };

    it('atualiza o produto e retorna um objeto com "modifiedCount" com valor 1',  () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } =  connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response =  Model.products.updatedProduct(insertedId, updatedPayload);

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta um produto cadastrado', () => {
  describe('quando não encontrado', () => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "deletedCount" com valor 0',  () => {
      const response =  Model.products.deleteProduct(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const payload = { name: 'Testy, the Tester', quantity: 45 };

    it('deleta o produto e retorna um objeto com "deletedCount" com valor 1',  () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } =  connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response =  Model.products.deleteProduct(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

/**  
 * *  * * * TESTES SALES  * * * *
*/

describe('Cadastro de uma nova venda', () => {
  describe('quando uma venda de um produto é adicionada com sucesso', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto',  () => {
      const response =  Model.sales.storeSales(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto',  () => {
      const response =  Model.sales.storeSales(payload);

      expect(response).to.have.property('_id');
    });
  });

  describe('quando uma venda de dois produtos é adicionada com sucesso', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }, { productId: ID_EXAMPLE, quantity: 7 }];

    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto',  () => {
      const response =  Model.sales.storeSales(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto',  () => {
      const response =  Model.sales.storeSales(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de vendas', () => {
  describe('quando não tem nenhuma cadastrada',() => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array',  () => {
      const response =  Model.sales.getAllSales();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('vazio',  () => {
      const response =  Model.sales.getAllSales();

      expect(response.sales).to.be.empty;
    });
  });

  describe('quando tem vendas cadastradas', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

       connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto contendo um array',  () => {
      const response =  Model.sales.getAllSales();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('de objetos',  () => {
      const response =  Model.sales.getAllSales();

      expect(response.sales[0]).to.be.an('object');

      expect(response.sales[0]).to.have.property('_id');
    });
  });
});

describe('Carrega uma venda cadastrada pela "_id"', () => {
  describe('quando não encontrada', () => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('o retorno é null',  () => {
      const response =  Model.sales.getSalesById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrada', () => {
    it('o retorno é um objeto com as informações dos produtos',  () => {
      const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } =  connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response =  Model.sales.getSalesById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('itensSold');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de uma venda', () => {
  const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

  describe('quando não encontra a venda', () => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "matchedCount" com valor 0',  () => {
      const response =  Model.sales.updateSale(ID_EXAMPLE, { itensSold: payload });

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const updatedPayload = [{ productId: ID_EXAMPLE, quantity: 7 }];

    it('atualiza os produtos vendidos e retorna um objeto com "modifiedCount" com valor 1',  () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } =  connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response =  Model.sales.updateSale(insertedId, { itensSold: updatedPayload });

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta uma venda cadastrada', () => {
  describe('quando não encontrada', () => {
    before( () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(() => {
      MongoClient.connect.restore();
    });

    it('retorna um objeto com "deletedCount" com valor 0',  () => {
      const response =  Model.sales.deleteSale(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    it('deleta a venda e retorna um objeto com "deletedCount" com valor 1',  () => {
      const connectionMock =  getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } =  connectionMock.db(DB_NAME)
        .collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response =  Model.sales.deleteSale(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});