// const { MongoMemoryServer } = require
// ('mongodb-memory-server-core');
// const { MongoClient, ObjectId } = require('mongodb');
// const sinon = require('sinon');
// const { expect } = require('chai');

// const mongoConnection = require('../../model/connection')
// const productsModel = require('../../model/productsModel')

// describe('Insere um novo produto no BD', () => {
// 	const newProduct = {
//     name: "UmProduto",
//     Quantity: "100"
//   }

//   let DBServer = new MongoMemoryServer();
//   let connectionMock;
  
//   before(async () => {
//     const URLMock = await DBServer.getUri();
//     connectionMock = await MongoClient.
//     connect(URLMock, {
//       useNewUrlParser: true,
// 			useUnifiedTopology: true,
//     })
//     .then(conn => conn.db('StoreManager'));

//     sinon.stub(mongoConnection, 'connection').resolves(connectionMock);
//   })

//   after(async () => {
// 		await mongoConnection.connection.restore();
//     await DBServer.stop();
// 	});

//   describe('Quando é inserido com sucesso', () => {
//     it('Retorna um objeto', async () => {
//       const response = await productsModel.create(newProduct)
//       expect(response).to.be.a('object');
//     })

//     it('O objeto possui o "id" do novo produto', async () => {
//       const response = await productsModel.create(newProduct);

//       expect(response).to.have.a.property('id');
//     });
//   })
// });
