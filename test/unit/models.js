const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');

const mongoConnection = require('../../models/connection');
const MoviesModel = require('../../models/modelExample');
const { afterEach } = require('mocha');


describe('Insere um novo filme no BD', () => {
	const payloadMovie = {
    id: '604cb554311d68f491ba5781',
		title: 'Example Movie',
		directedBy: 'Jane Dow',
		releaseYear: 1999
	};

	let DBServer = new MongoMemoryServer();;
	let connectionMock;

  before(async () => {
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(URLMock, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
    .then((conn) => conn.db('model_example'));
		
		sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

	after(async () => {
		await mongoConnection.getConnection.restore();
	});


	describe('quando é inserido com sucesso' , async () => {
		it('retorna um objeto' , async () => {
			const response = await MoviesModel.create(payloadMovie);
			expect(response).to.be.a('object');
		});

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.have.a.property('id');
    });

		it('deve existir um filme com o título cadastrado!', async () => {
      await MoviesModel.create(payloadMovie);
      const movieCreated = await connectionMock.collection('movies').findOne({ title: payloadMovie.title });
      expect(movieCreated).to.be.not.null;
		});
	});
});

/*Primeiro vamos criar as descrições de cada teste - A primeira descrição diz respeito a finalidade do teste */
describe('Busca todos os filmes no BD', () => {

  const DBServer = new MongoMemoryServer();

  before(async () => {
      const URLMock = await DBServer.getUri();
      const connectionMock = await MongoClient
          .connect(URLMock, { useNewUrlParser: true, useUnifiedTopology: true })
          .then((conn) => conn.db('model_example'));

      sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock);
  });

  after(async () => {
      mongoConnection.getConnection.restore();
      await DBServer.stop();
  });

  describe('quando não existe nenhum filme criado', () => {

      it('retorna um array', async () => {
          const response = await MoviesModel.getAll();
          expect(response).to.be.an('array');
      });

      it('o array está vazio', async () => {
          const response = await MoviesModel.getAll();
          expect(response).to.be.empty;
      });
  });

  describe('quando existem filmes criados', () => {
      const expectedMovie = {
          id: '604cb554311d68f491ba5781',
          title: 'Example Movie',
          directedBy: 'Jane Dow',
          releaseYear: 1999,
      };

      before(async () => {
          const db = await mongoConnection.getConnection();
          await db.collection('movies').insertOne({ ...expectedMovie });
      });

      after(async () => {
          const db = await mongoConnection.getConnection();
          await db.collection('movies').drop();
      });

      it('retorna um array', async () => {
          const response = await MoviesModel.getAll();
          expect(response).to.be.an('array');
      });

      it('o array não está vazio', async () => {
          const response = await MoviesModel.getAll();

          expect(response).to.be.not.empty;
      });

      it('o filme cadastrado está na lista', async () => {
          const [{ id, title, directedBy, releaseYear }] = await MoviesModel.getAll();

          expect({ id, title, directedBy, releaseYear }).to.deep.equal(expectedMovie);
      });
  });
});
