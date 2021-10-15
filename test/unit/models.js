const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const DB_NAME = 'StoreManager';
const COLLECTION_P = 'products';
const COLLECTION_S = 'sales';

const Model = require('../../models');

const ID_EXAMPLE = '604cb554311d68f491ba5781';

let connectionMock;
before(async () => {
  const DBServer = new MongoMemoryServer();
  const URLMock = await DBServer.getUri();

  connectionMock = await MongoClient.connect(
    URLMock,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  connectionMock = connectionMock.db('StoreManager')

  sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
});

// Restauraremos a função `getConnection` original após os testes.
after(() => {
  mongoConnection.getConnection.restore();
});


describe('Cadastro de um novo produto', () => {
  describe('quando é adicionado com sucesso', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    it('retorna um objeto', async () => {
      const response = await Model.products.addProduct(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.products.addProduct(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de produtos', () => {
  describe('quando não tem nenhum cadastrado', () => {

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.products.getProducts();

      expect(response.products).to.be.empty;
    });
  });

  describe('quando tem produtos cadastrados', () => {
    const payload = { name: 'Testy, the Tester', quantity: 30 };

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.products.getProducts();

      expect(response).to.be.an('object');

      expect(response.products).to.be.an('array');
    });

    it('de objetos', async () => {
      const response = await Model.products.getProducts();

      expect(response.products[0]).to.be.an('object');

      expect(response.products[0]).to.have.property('_id');
    });
  });
});

describe('Carrega um produto cadastrado pela "_id"', () => {
  describe('quando não encontrado', () => {

    it('o retorno é null', async () => {
      const response = await Model.products.getProductById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrado', () => {
    it('o retorno é um objeto com as informações do produto', async () => {
      const payload = { name: 'Testy, the Tester', quantity: 30 };

      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response = await Model.products.getProductById(insertedId);

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

    it('retorna um objeto com "matchedCount" com valor 0', async () => {
      const response = await Model.products.updateProduct(ID_EXAMPLE, payload);

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const updatedPayload = { name: 'Testy, the Tester', quantity: 45 };

    it('atualiza o produto e retorna um objeto com "modifiedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response = await Model.products.updateProduct(insertedId, updatedPayload);

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta um produto cadastrado', () => {
  describe('quando não encontrado', () => {
    it('retorna um objeto com "deletedCount" com valor 0', async () => {
      const response = await Model.products.deleteProduct(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrado', () => {
    const payload = { name: 'Testy, the Tester', quantity: 45 };

    it('deleta o produto e retorna um objeto com "deletedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_P).insertOne(payload);

      const response = await Model.products.deleteProduct(insertedId);

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

    it('retorna um objeto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.have.property('_id');
    });
  });

  describe('quando uma venda de dois produtos é adicionada com sucesso', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }, { productId: ID_EXAMPLE, quantity: 7 }];

    it('retorna um objeto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.be.an('object');
    });

    it('tal objeto possui a "_id" do produto', async () => {
      const response = await Model.sales.addSales(payload);

      expect(response).to.have.property('_id');
    });
  });
});

describe('Carrega a lista de vendas', () => {
  describe('quando não tem nenhuma cadastrada', () => {

    it('retorna um objeto contendo um array', async () => {
      const response = await Model.sales.getSales();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('vazio', async () => {
      const response = await Model.sales.getSales();

      expect(response.sales).to.be.empty;
    });
  });

  describe('quando tem vendas cadastradas', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];


    it('retorna um objeto contendo um array', async () => {
      const response = await Model.sales.getSales();

      expect(response).to.be.an('object');

      expect(response.sales).to.be.an('array');
    });

    it('de objetos', async () => {
      const response = await Model.sales.getSales();

      expect(response.sales[0]).to.be.an('object');

      expect(response.sales[0]).to.have.property('_id');
    });
  });
});

describe('Carrega uma venda cadastrada pela "_id"', () => {
  describe('quando não encontrada', () => {

    it('o retorno é null', async () => {
      const response = await Model.sales.getSaleById(ID_EXAMPLE);

      expect(response).to.be.equal(null);
    });
  });

  describe('quando encontrada', () => {
    it('o retorno é um objeto com as informações dos produtos', async () => {
      const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response = await Model.sales.getSaleById(insertedId);

      expect(response).to.be.an('object');

      expect(response).to.have.property('itensSold');

      MongoClient.connect.restore();
    });
  });
});

describe('Atualiza as informações de uma venda', () => {
  const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

  describe('quando não encontra a venda', () => {

    it('retorna um objeto com "matchedCount" com valor 0', async () => {
      const response = await Model.sales.updateSale(ID_EXAMPLE, { itensSold: payload });

      expect(response).to.be.an('object');

      expect(response.matchedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const updatedPayload = [{ productId: ID_EXAMPLE, quantity: 7 }];

    it('atualiza os produtos vendidos e retorna um objeto com "modifiedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME).collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response = await Model.sales.updateSale(insertedId, { itensSold: updatedPayload });

      expect(response).to.be.an('object');

      expect(response.modifiedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});

describe('Deleta uma venda cadastrada', () => {
  describe('quando não encontrada', () => {

    it('retorna um objeto com "deletedCount" com valor 0', async () => {
      const response = await Model.sales.deleteSale(ID_EXAMPLE);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(0);
    });
  });

  describe('quando encontrada', () => {
    const payload = [{ productId: ID_EXAMPLE, quantity: 3 }];

    it('deleta a venda e retorna um objeto com "deletedCount" com valor 1', async () => {
      const connectionMock = await getConnection();

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      const { insertedId } = await connectionMock.db(DB_NAME)
        .collection(COLLECTION_S).insertOne({ itensSold: payload });

      const response = await Model.sales.deleteSale(insertedId);

      expect(response).to.be.an('object');

      expect(response.deletedCount).to.be.equal(1);

      MongoClient.connect.restore();
    });
  });
});
