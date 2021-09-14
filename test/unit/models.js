const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const getConnection = require('./testConnection');
const productsModel = require('../../models/productsModel');
const { after, before } = require('mocha');

const payload = { name: 'Caixa de Bananas', quantity: 50 };

describe('Testa produtos', () => {
  let connectionMock;

  before(async () => {
    connectionMock = await getConnection();
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    await connectionMock.db('StoreManager').collection('products').deleteMany({});
    MongoClient.connect.restore();
  });

  describe('Testa se cria produto', ()=> {
    describe('Quando insere com sucesso!', () => {
      let response;

      before(async () => {
        response = await productsModel.create('Caixas de banana', 50);
      });

      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      it('Retorna um Objeto', () => {
        expect(response).to.be.a('object');
      });

      it('Possui chaves "_id", "name", "quantity"', () => {
        expect(response).to.include.keys('_id', 'name', 'quantity');
      });

      it('"name" deve ser uma string com mais de 5 caracteres', () => {
        const { name } = response;
        expect(name).to.be.a('string');
        expect(name.length).to.be.greaterThan(5);
      });
      
      it('"quantity" deve ser um numero maior que 0', () => {
        const { quantity } = response;
        expect(quantity).to.be.a('number');
        expect(quantity).to.be.greaterThan(0);
      });
    });

    describe('Quando falha inserção', () => {
      let response;

      before(async ()=> {
        response = await productsModel.create('Caixa');
      });

      after(async () => {
        await connectionMock.db('StoreManager').collection('products').deleteMany({});
      });

      describe('Testa a letura dos produtos', () => {
        describe('Quando é feito a leitura com sucesso', () => {
          let response;

          before(async () => {
            response = await productsModel.getAll();
          });

          it('O resultado deve ser um array', () => {
            expect(response).to.be.a('array');
          });

          it('O resultado deve ser um array apenas com objetos', () => {
            response.forEach((product) => expect(product).to.be.a('object'));
          });
        });
      });

      describe('Testa a busca de produtos por "id" ', () => {
        describe('Quando a busca é feita com sucesso', () => {
          let response;

          before(async ()=> {
            response = await productsModel.create('Produto', 50);
          });

          after(async () => {
            await connectionMock.db('StoreManager').collection('products').deleteMany({});
          });

          it('O resultado deve ser um objeto', async () => {
            const findProduct = await productsModel.getById(response._id);

            expect(findProduct).to.be.a('object');
          });

          it('O resultado deve conter as chaves "_id", "name", "quantity"', async () => {
            const findProduct = await productsModel.getById(response._id);

            expect(findProduct).to.include.all.keys('_id', 'name', 'quantity');
          });

          describe('Quando falha na busca por id', () => {
            describe('Quando produto nao existe', () => {
              it('Deve-se retornar null', async () => {
                const inexistentId = 999999;
                const findProduct = await productsModel.getById(inexistentId);

                expect(findProduct).to.be.null;
              });
            });
          });
        });
      });
      describe('Testa a atualizacão de produtos', async () => {
        let productsUpdate;

        before(async () => {
          productsUpdate = await productsModel.create('Produto', 100);
        });

        after(async () => {
          await connectionMock.db('StoreManager').collection('products').deleteMany({});
        });

        describe('Quando atualização é realizada com sucesso', () => {
          it('O retorno deve ser o esperado', async () => {
            await productsModel.update(productsUpdate._id, 'Atulizado!', 999);
            const updatedProduct = await productsModel.getById(productsUpdate._id);

            expect(updatedProduct.name).to.be.equal('Atualizado!');
            expect(updatedProduct.quantity).to.be.equal(200);
          });
        });
      });
    });
  });

})
