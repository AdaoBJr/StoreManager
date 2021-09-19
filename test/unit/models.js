const sinon = require('sinon');
const { expect, assert } = require('chai');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const productsModel = require('../../models/productsModels');
const salesModel = require('../../models/salesModel');
const mongoConnection = require('../../models/connection');
const CustomError = require('../../helpers/CustomError');

const productOne = { "name": "Camisa las costas", "quantity": 30 };
const productTwo =  { "name": "Camisa las frentes", "quantity": 200 };
const idFake = '61449c721d82f6493326b5f9'
const salesOne = [
  { "productId": "6140fab81b5413db82960322", "quantity": "10" },
  { "productId": "6140fabf1b5413db82960323", "quantity": "5" }
]
const salesUpdate = [
  { "productId": "6140fab81b5413db82960322", "quantity": "30" },
]

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

describe('Model de vendas', () => {
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
  });

  afterEach(() => {
    mongoConnection.getConnection.restore();
    DBServer.stop();
  });

  describe('função create', () => {
    it('retorna um objeto com informações da venda.', async () => {
      const registredSales = await salesModel.create(salesOne);
      
      expect(registredSales).to.have.a.property('_id')
      expect(registredSales.itensSold).to.deep.equal(salesOne);
    });
  });

  describe('função findAll', () => {
    it('retorna todos as vendas', async () => {
      await salesModel.create(salesOne);
      await salesModel.create(salesOne);
      const allSales = await salesModel.findAll();
      
      expect(allSales).to.have.length(2);
    });
  });

  describe('função findById', () => {
    it('retorna um objeto correto referente ao id buscado', async () => {
      const {_id: id } = await salesModel.create(salesOne);

      const saleFindedById = await salesModel.findById({ id });

      expect(typeof saleFindedById).to.equal('object');
      expect(saleFindedById.itensSold).to.deep.equal(salesOne);
    });

    // utilizeis esse site: https://stackoverflow.com/questions/45466040/verify-that-an-exception-is-thrown-using-mocha-chai-and-async-await
    it('retona erro customizado caso id seja inválido', async () => {
      try{
        await salesModel.findById({ id: '' })
      }catch(err) {
        expect(err.message).to.equal('Sale not found')
        expect(err.code).to.equal('not_found')
        expect(err.statusCode).to.equal(404)
      }
    });
  });

  describe('função updateById', () => {
    it('retorna o objeto que foi atualizado o a vendo por id', async () => {
      const {_id: saleId } = await salesModel.create(salesOne);
      await salesModel.create(salesOne);

      const result = await salesModel.updateById({saleId, itensSold: salesUpdate});
      expect(result).to.deep.equal({ _id: saleId, itensSold: salesUpdate });
    });

    it('é atualizado o a quantidade de vedas de um produto', async () => {
      const {_id: saleId } = await salesModel.create(salesOne);
      await salesModel.create(salesOne);
      await salesModel.updateById({saleId, itensSold: salesUpdate})

      const salefindedById = await salesModel.findById({id: saleId});
      expect(salefindedById.itensSold[0].quantity).to.equal('30')
    });

    it('retona null caso nada seja atualizado', async () => {
      await salesModel.create(salesOne);

      const result = await salesModel.updateById({saleId: idFake, itensSold: salesUpdate})
      expect(result).to.equal(null);
    });
  });

  describe('função remove', () => {
    it('id encontrado retorna boolean true e remove item', async() => {
      const {_id: id } = await salesModel.create(salesOne);
      await salesModel.create(salesOne);
      const booleanResult = await salesModel.remove({ id });
      expect(booleanResult).to.equal(true)

      const allSales = await salesModel.findAll()
      expect(allSales).to.have.length(1);
    })

    it('id não encontrado retorna boolean false e não remove item', async() => {
      await salesModel.create(salesOne);
      await salesModel.create(salesOne);
      const booleanResult = await salesModel.remove({ id: idFake });
      expect(booleanResult).to.equal(false)

      const allSales = await salesModel.findAll()
      expect(allSales).to.have.length(2);
    })
  })
});