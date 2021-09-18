const sinon = require('sinon');
const {expect} = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/productsModels');
const mongoConnection = require('../../models/connection')

const productOne = { "name": "Camisa las costas", "quantity": 30 };
const productTwo =  { "name": "Camisa las frentes", "quantity": 200 };
const idFake = '61449c721d82f6493326b5f9'

describe('Model de produtos', () => {
  let connectionMock;
  let DBServer

  beforeEach(async ()=>{
    DBServer = new MongoMemoryServer();
    
    const URLMock = await DBServer.getUri();

    connectionMock = await MongoClient
      .connect(URLMock, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db('StoreManager'));

    sinon.stub(mongoConnection, 'getConnection').resolves(connectionMock)
  })

  afterEach(() => {
    mongoConnection.getConnection.restore();
    DBServer.stop();
  })

  
  describe('Função create', () => {    
    it('retorna um objeto com seu id e as informações do produto cadastrado', async () => {
      const registredProduct = await productsModel.create(productOne)
     
      expect(registredProduct).to.have.a.property('_id')
      expect(registredProduct.name).to.equal(productOne.name);
      expect(registredProduct.quantity).to.equal(productOne.quantity);
    })
  })

  describe('Função findAll', () => {
    it('retorna todos os produtos', async () => {
      await productsModel.create(productOne);
      await productsModel.create(productTwo);

      const products = await productsModel.findAll();
      
      expect(products).to.have.length(2); 
    })
  })

  describe('função findName', () => {
    it('retorna um objeto certo pesquisa pelo nome', async () => {
      await productsModel.create(productOne);
      await productsModel.create(productTwo);

      const productFindedByName = await productsModel.findName({name: productTwo.name});
      
      expect(typeof productFindedByName).to.equal('object');
      expect(productFindedByName.name).to.equal(productTwo.name);
      expect(productFindedByName.quantity).to.equal(productTwo.quantity);
    })
  })

  describe('Função findById', () => {
    it('retorna um objeto com o nome e quantidade do produto encontrado', async() => {
      const productRegistred = await productsModel.create(productOne);
      const productFindedById = await productsModel.findById({id: productRegistred._id});

      expect(typeof productFindedById).to.equal('object');
      expect(productRegistred.name).to.equal(productFindedById.name);
      expect(productRegistred.quantity).to.equal(productFindedById.quantity);
    })
  })

  describe('Função updateById', () => {
    it('retorna um objeto com os valores atualizados', async() => {
      const newName = 'camisa los veganos'
      const newQuantity = '90'

      const {_id: id} = await productsModel.create(productOne)
      const productUpdated = await productsModel
        .updateById({ id, name: newName, quantity: newQuantity})
    
      expect(typeof productUpdated).to.equal('object');
      expect(productUpdated.name).to.equal(newName);
      expect(productUpdated.quantity).to.equal(newQuantity);
    })

    it('id invalido retorna um objeto avisando que o produto não foi atualizado', async() => {
      const newName = 'camisa los veganos'
      const newQuantity = '90'

      await productsModel.create(productOne)

      const response = await productsModel
        .updateById({ id: idFake, name: newName, quantity: newQuantity})

      expect(response).to.deep.equal({ id: idFake, message: 'product not update' })
    })
  })

  describe('função remove', ()=> {
    it('retorna um boolean true para caso seja deletado', async ()=>{
      const {_id: id} = await productsModel.create(productOne)
      await productsModel.create(productTwo)
      const boolean = await productsModel.remove({ id })
      
      expect(boolean).to.equal(true);
    })

    it('retorna um boolean false para caso não seja deletado', async ()=>{
      await productsModel.create(productOne)
      await productsModel.create(productTwo)
      const boolean = await productsModel.remove({ id: idFake })
      
      expect(boolean).to.equal(false);
    })

    it('é verificado que o produto é removido do banco', async () => {
      const {_id: id} = await productsModel.create(productOne);
      await productsModel.create(productTwo);

      const products2 = await productsModel.findAll();
      expect(products2).to.have.length(2); 

      await productsModel.remove({ id });

      const products1 = await productsModel.findAll();
      expect(products1).to.have.length(1); 
    });
  });

  describe('função decrementeQuantityProduct', () => {
    it('decrementre a quantidade de podutos e retorna um boolean true de sucesso', async () => {
      const {_id: id} = await productsModel.create(productOne);

      const response = await productsModel.decrementeQuantityProduct(id, 10);
      expect(response).to.equal(true);

      const productFindedById = await productsModel.findById({ id });
      expect(productFindedById.quantity).to.equal(20);
    });

    it('retorna um boolean false caso passe um id que não existe', async() => {
      await productsModel.create(productOne);

      const response = await productsModel.decrementeQuantityProduct(idFake, 10);
      expect(response).to.equal(false);
    });
  });

  describe('função incrementeQuantityProduct', () => {
    it('incremente a quantidade de podutos e retorna um boolean true de sucesso', async() => {
      const {_id: id} = await productsModel.create(productOne);

      const response = await productsModel.incrementeQuantityProduct(id, 10);
      expect(response).to.equal(true);

      const productFindedById = await productsModel.findById({ id });
      expect(productFindedById.quantity).to.equal(40);
    });

    it('retorna um boolean false caso passe um id que não existe', async() => {
      await productsModel.create(productOne);

      const response = await productsModel.incrementeQuantityProduct(idFake, 10);
      expect(response).to.equal(false);
    });
  });
});