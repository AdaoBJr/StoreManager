const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/Products');

describe('Executa os testes da camada de models', () => {
  before(async () => {
    const DBSERVER = new MongoMemoryServer();
    const URLMOCK = await DBSERVER.getUri(); // getUri retorna uma promise
    const mockConnection = await MongoClient.connect(
      URLMOCK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    sinon.stub(MongoClient, "connect").resolves(mockConnection);
  });

  after(() => {
    MongoClient.connect.restore();
  });

  describe('quando executado get em /products', () => {
    describe('a resposta', () => {

      it('oQueDeveFazer', async () => {

      });
    })
  });
});




describe('Insere um novo filme no DB', () => {
  const moviePayload = {
    title: 'Bastardos Inglórios',
    directedBy: 'Quentin Tarantino',
    releaseYear: 2009,
  };

  describe('quando é inserido com sucesso', () => {
    it('retorna um Objeto', async () => {
      const result = await MoviesModel.create(moviePayload);
      expect(result).to.be.an('object');
    });
    it('possui a propriedade "id" do novo filme inserido', async () => {
      const result = await MoviesModel.create(moviePayload);
      expect(result).to.have.a.property('id')
    });
  });
});
