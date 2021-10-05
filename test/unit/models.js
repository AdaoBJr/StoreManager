const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const getConnection = require('./connectionMock');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const { after, before } = require('mocha');

describe('Teste productsModel', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
  });

describe('Testando a criação de produtos no banco de dados', () => {
  describe('Criação ok !', () => {
    let response;

  before(async () => {
    response = await productsModel.add('Produto do Batista', 100);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
  });

  it('Retorno de um objeto', () => {
    expect(response).to.be.a('object');
      });

  it('Se existe as chaves "_id", "name", "quantity"', () => {
    expect(response).to.include.keys('_id', 'name', 'quantity');
    });

  it('"name" é uma string com mais de 5 caracteres', () => {
    const { name } = response;
    expect(name).to.be.a('string');
    expect(name.length).to.be.greaterThanOrEqual(5);
    });

  it('"quantity" é um número maior que 0', () => {
    const { quantity } = response;
    expect(quantity).to.be.a('number');
    expect(quantity).to.be.greaterThan(0);
    });
  });

describe('Falha na criação', () => {
  let response;

  before(async () => {
    response = await productsModel.add('Produto', 100);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
  });

  describe('Produto ja existente no banco', () => {
    it('Deve retornar null', async () => {
      const duplicityResponse = await productsModel.add('Produto', 100);

      expect(duplicityResponse).to.be.null;
    });
  });
});
});

describe('Testa a leitura dos produtos no banco de dados', () => {
  describe('Quando a leitura é feita com sucesso', () => {
    let response;

    before(async () => {
      response = await productsModel.getAll();
    });

    it('O resultado deve ser um array', () => {
      expect(response).to.be.a('array');
    });

    it('O resultado deve ser um array populado', () => {
      response.forEach((product) => expect(product).to.be.a('object'));
    });
  });
});

describe('Buscando produtos por id', () => {
  describe('ID localizado com sucesso', () => {
    let response;

    before(async () => {
      response = await productsModel.add('Produto', 100);
    });

    after(async () => {
      await connectionMock.db('StoreManager').collection('products').deleteMany({});
    });

    it('Resultado retorna um objeto', async () => {
      const foundProduct = await productsModel.getById(response._id);

      expect(foundProduct).to.be.a('object');
    });

    it('A resposta tem que conter as chaves "_id", "name", "quantity"', async () => {
      const foundProduct = await productsModel.getById(response._id);

      expect(foundProduct).to.include.all.keys('_id', 'name', 'quantity');
    });

    describe('Busca por id ok!', () => {
      describe('Produto não existente', () => {
        it('Retorno null', async () => {
          const inexistentId = 999999;
          const foundProduct = await productsModel.getById(inexistentId);

          expect(foundProduct).to.be.null;
        });
      });
    });
  });
});

});
