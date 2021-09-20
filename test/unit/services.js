const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');
const salesService = require('../../services/salesService');
const salesModel = require('../../models/salesModel');

const validMongoID = '6143e8464716e23ea4f4b579';
const invalidMongoID = '123456'
const validProductFromMongo = { _id: '6147695d3f0b891bd52cd527', name: 'greatName', quantity: 10 };
const validSaleFromMongo = {
    "_id": "6147bc9c150a3225324361d2",
    "itensSold": [{ "productId": "6143f48ff79d6d50119682eb", "quantity": 20 }]
};

const validProduct = { id: '6147695d3f0b891bd52cd527', name: 'greatName', quantity: 10 };
const invalidProductName = { id: 'id', name: 'name', quantity: 10 };
const invalidProductQuantity = { id: 'id', name: 'greatName', quantity: 0 };
const invalidProductTypeOfQuantity = { id: 'id', name: 'greatName', quantity: '10' };

const validSale = [{ "productId": "6143f48ff79d6d50119682eb", "quantity": 20 }];
const invalidSaleProductQuantity = [{ "productId": "6143f48ff79d6d50119682eb", "quantity": '0' }];


describe('Testa o funcionamento de productsService', () => {
  describe('Chama a função createProduct', () => {
    describe('Não existe o produto no banco de dados', () => {

      before(() => {
        sinon.stub(productsModel, 'getProductByName').resolves([]);
        sinon.stub(productsModel, 'createProduct').resolves(validProductFromMongo);
      });
    
      after(() => {
        productsModel.getProductByName.restore();
        productsModel.createProduct.restore()
      });

      describe('O produto não é criado com sucesso', () => {
        describe('Verifica as validações quanto ao nome e quantidade do produto à ser inserido', () => {

          it('Falha na verificação do nome e retorna o objeto de erro', async () => {
            const result = await productsService.createProduct(invalidProductName);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', '"name" length must be at least 5 characters long');
          })

          it('Falha na verificação de typeOF da quantidade e retorna o objeto de erro', async () => {
            const result = await productsService.createProduct(invalidProductTypeOfQuantity);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', '"quantity" must be a number');
          })

          it('Falha na verificação da quantidade e retorna o objeto de erro', async () => {
            const result = await productsService.createProduct(invalidProductQuantity);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', '"quantity" must be larger than or equal to 1');
          })

        });
      });

      describe('O produto é criado com sucesso', () => {

        it('Retorna o objeto do produto criado com _id, name e quantity', async () => {
          const result = await productsService.createProduct(validProduct);
          expect(result).to.be.an('object');
          expect(result).to.have.property('_id');
          expect(result).to.have.property('name');
          expect(result).to.have.property('quantity');
        });

      });
    });
    
    describe('Existe o produto no Banco de Dados', () => {

      before(() => sinon.stub(productsModel, 'getProductByName').resolves([{}]));
      after(() => productsModel.getProductByName.restore());
      
      it('Retorna um objeto com as informações de erro', async () => {
        const result = await productsService.createProduct(validProduct);
        expect(result).to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Product already exists');
      });

    });
  });

  describe('Chama a função getAllProducts', () => {
    describe('Não existem produtos cadastrados', () => {

      before(() => sinon.stub(productsModel, 'getAllProducts').resolves([]));
      after(() => productsModel.getAllProducts.restore());

      it('Retorna um objeto com a propriedade products contendo um array vazio', async () => {
        const result = await productsService.getAllProducts();
        expect(result)
          .to.an('object')
          .that.has.property('products')
          .that.is.an('array')
          .that.has.lengthOf(0);
      })
    });

    describe('Existem produtos cadastrados', () => {

      before(() => sinon.stub(productsModel, 'getAllProducts').resolves([{}]));
      after(() => productsModel.getAllProducts.restore());

      it('Retorna um objeto com a propriedade products contendo um array de objetos com uma ou mais posições', async () => {
        const result = await productsService.getAllProducts();
        expect(result)
          .to.be.an('object')
          .that.has.property('products')
          .that.is.an('array')
          .that.has.length.greaterThan(0)
      })

    });
  });

  describe('Chama a função getProductById', () => {
    describe('O id informado não é válido', () => {

      before(() => sinon.stub(productsModel, 'getProductById').resolves(null));
      after(() => productsModel.getProductById.restore());

      it('Falha na verificação do id e retorna o objeto de erro', async () => {
        const result = await productsService.getProductById(invalidMongoID);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Wrong id format');
      })

    });

    describe('O id informado é válido', () => {
      describe('O produto não existe no Banco de Dados', () => {
      
        before(() => sinon.stub(productsModel, 'getProductById').resolves(undefined));
        after(() => productsModel.getProductById.restore());

        it('Retorna um objeto com as informações de erro', async () => {
          const result = await productsService.getProductById(validMongoID);
          expect(result)
            .to.be.an('object')
            .that.has.property('err')
            .that.has.property('message', 'Wrong id format');
        });

      });

      describe('O produto existe no Banco de Dados', () => {
        
        before(() => sinon.stub(productsModel, 'getProductById').resolves(validProductFromMongo));
        after(() => productsModel.getProductById.restore());

        it('Retorna o objeto do produto encontrado com as propriedades _id, name e quantity', async () => {
          const result = await productsService.getProductById(validMongoID);
          expect(result).to.be.an('object')
          expect(result).to.have.property('_id')
          expect(result).to.have.property('name')
          expect(result).to.have.property('quantity')
        });

      });
    });
  });

  describe('Chama a função updateProductById', () => {
    describe('O produto não existe no Banco de Dados', () => {

      before(() => sinon.stub(productsModel, 'getProductById').resolves(null))
      after(() => productsModel.getProductById.restore());

      it('Falha na busca pelo produto no Banco de Dados e retorna o objeto de erro', async () => {
        const result = await productsService.updateProductById(invalidMongoID);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Product did not exists');
      });
    });

    describe('O produto existe no Banco de Dados', () => {
      describe('Verifica as validações quanto ao nome e quantidade do produto à ser atualizado', () => {
        describe('Falha nas validações de nome e quantidade', () => {

          before(() => sinon.stub(productsModel, 'getProductById').resolves({}))
          after(() => productsModel.getProductById.restore());
  
          it('Falha na verificação do nome e retorna o objeto de erro', async () => {
            const result = await productsService.updateProductById(invalidProductName);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', '"name" length must be at least 5 characters long');
          });
  
          it('Falha na verificação de typeOf da quantidade e retorna o objeto de erro', async () => {
            const result = await productsService.updateProductById(invalidProductTypeOfQuantity);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', '"quantity" must be a number');
          });
  
          it('Falha na verificação da quantidade e retorna o objeto de erro', async () => {
            const result = await productsService.updateProductById(invalidProductQuantity);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', '"quantity" must be larger than or equal to 1');
          })
  
        });
  
        describe('Sucesso nas validações de nome e quantidade', () => {
          
          before(() => {
            sinon.stub(productsModel, 'getProductById').resolves(validProductFromMongo);
            sinon.stub(productsModel, 'updateProductById').resolves(validProductFromMongo);
          });

          after(() => {
            productsModel.getProductById.restore();
            productsModel.updateProductById.restore();
          });

          it('Retorna o objeto do produto após atualização com as propriedades _id, name e quantity', async () =>{
            const result = await productsService.updateProductById(validProduct);
            expect(result).to.be.an('object');
            expect(result).to.have.property('_id');
            expect(result).to.have.property('name');
            expect(result).to.have.property('quantity');
          })
        });
      })
    });
  });

  describe('Chama a função excludeProductById', () => {
    describe('O produto não existe no Banco de Dados', () => {

      before(() => sinon.stub(productsModel, 'getProductById').resolves(null));
      after(() => productsModel.getProductById.restore());

      it('Falha na busca pelo produto no Banco de Dados e retorna o objeto de erro', async () => {
        const result = await productsService.excludeProductById(invalidMongoID);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Wrong id format');

      })
    });

    describe('O produto existe no Banco de Dados', () => {

      before(() => {
        sinon.stub(productsModel, 'getProductById').resolves(validProductFromMongo);
        sinon.stub(productsModel, 'excludeProductById').resolves(validProductFromMongo);
      });

      after(() => {
        productsModel.getProductById.restore();
        productsModel.excludeProductById.restore();
      });

      it('Sucesso na exclusão do produto e retorna o objeto do produto com as propriedades _id, name e quantity', async () => {
        const result = await productsService.excludeProductById(validMongoID);
        expect(result).to.be.an('object');
        expect(result).to.have.property('_id');
        expect(result).to.have.property('name');
        expect(result).to.have.property('quantity');
      });

    });
  });
});


describe('Testa o funcionamento de salesService', () => {
  describe('Chama a função createSale', () => {
    describe('Os produtos da venda não são válidos', () => {
      
      it('Falha na validação da quantidade e retorna o objeto de erro', async () => {
        const result = await salesService.createSale(invalidSaleProductQuantity);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Wrong product ID or invalid quantity')
      })

    })

    describe('Os produtos da venda são válidos', () => {
      describe('Nem todos os produtos da venda existem no Banco de Dados', () => {

        before(() => sinon.stub(productsModel, 'getProductById').resolves(null));
        after(() => productsModel.getProductById.restore());

        it('Retorna o objeto de erro', async () => {
          const result = await salesService.createSale(validSale);
          expect(result)
            .to.be.an('object')
            .that.has.property('err')
            .that.has.property('message', 'Wrong product ID or invalid quantity');
        })
      });

      describe('Todos os produtos da venda existem no Banco de Dados', () => {
        describe('Não existe quantidade suficiente no estoque para a venda', () => {

          before(() => sinon.stub(productsModel, 'getProductById').resolves(validProductFromMongo))
          after(() => productsModel.getProductById.restore());

          it('Retorna o objeto de erro', async () => {
            const result = await salesService.createSale(validSale);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', 'Such amount is not permitted to sell');
          });

        });

        describe('Existe quantidade suficiente no estoque para a venda', () => {

          before(() => {
            sinon.stub(productsModel, 'getProductById').resolves({ _id: '6147695d3f0b891bd52cd527', name: 'greatName', quantity: 25 });
            sinon.stub(salesModel, 'createSale').resolves(validSaleFromMongo);
            sinon.stub(productsModel, 'removeFromStockQuantity').resolves(null);
          });

          after(() => {
            productsModel.getProductById.restore();
            salesModel.createSale.restore();
            productsModel.removeFromStockQuantity.restore();
          })

          it('Cria a venda com sucesso e retorna o objeto da venda da venda criada', async () => {
            const result = await salesService.createSale(validSale);
            expect(result).to.be.an('object');
            expect(result).to.have.property('_id');
            expect(result).to.have.property('itensSold').that.is.an('array');
          });

        });
      });
    })
  })

  describe('Chama a função getAllSales', () => {
    describe('Não existem vendas cadastradas', () => {

      before(() => sinon.stub(salesModel, 'getAllSales').resolves([]))
      after(() => salesModel.getAllSales.restore());

      it('Retorna um objeto com a propriedade sales contendo um array vazio', async () => {
        const result = await salesService.getAllSales();
        expect(result)
          .to.be.an('object')
          .that.has.property('sales')
          .that.is.an('array')
          .that.has.lengthOf(0);
      });
    });

    describe('Existem vendas cadastradas', () => {
      
      before(() => sinon.stub(salesModel, 'getAllSales').resolves([{}]));
      after(() => salesModel.getAllSales.restore(0));

      it('Retorna um objeto com a propriedade sales contendo um array de objetos com uma ou mais posições', async () => {
        const result = await salesService.getAllSales();
        expect(result)
          .to.be.an('object')
          .that.has.property('sales')
          .that.is.an('array')
          .that.has.length.greaterThan(0);
      });
    });
  });

  describe('Chama a função getSaleById', () => {
    describe('O id informado não é válido', () => {
      
      before(() => sinon.stub(salesModel, 'getSaleById').resolves(null));
      after(() => salesModel.getSaleById.restore());

      it('Falha na verificação do id e retorna o objeto de erro', async () => {
        const result = await salesService.getSaleById(invalidMongoID);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Sale not found');
      });
    });

    describe('O id informado é válido', () => {
      describe('A venda não existe no Banco de Dados', () => {

        before(() => sinon.stub(salesModel, 'getSaleById').resolves(undefined));
        after(() => salesModel.getSaleById.restore());

        it('Falha na verificação do id e retorna o objeto de erro', async () => {
          const result = await salesService.getSaleById(validMongoID);
          expect(result)
            .to.be.an('object')
            .that.has.property('err')
            .that.has.property('message', 'Sale not found');
        });
      });

      describe('A venda existe no Banco de Dados', () => {

        before(() => sinon.stub(salesModel, 'getSaleById').resolves(validSaleFromMongo));
        after(() => salesModel.getSaleById.restore());

        it('Retorna o objeto da venda encontrado com as propriedades _id, name e quantity', async () => {
          const result = await salesService.getSaleById(validMongoID);
          expect(result).to.be.an('object');
          expect(result).to.have.property('_id');
          expect(result)
            .to.have.property('itensSold')
            .that.is.an('array')
            .that.has.length.greaterThan(0);
        });
      });
    });
  });

  describe('Chama a função updateSaleById', () => {
    describe('O id informado não é válido', () => {

      before(() => sinon.stub(salesModel, 'getSaleById').resolves(null));
      after(() => salesModel.getSaleById.restore());

      it('Falha na verificação do id e retorna o objeto de erro', async () => {
        const result = await salesService.getSaleById(invalidMongoID, validSale);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Sale not found');
      });

    });

    describe('O id informado é válido', () => {
      describe('A venda não existe no Banco de Dados', () => {

        before(() => sinon.stub(salesModel, 'getSaleById').resolves(undefined));
        after(() => salesModel.getSaleById.restore());

        it('Falha na verificação do id e retorna o objeto de erro', async () => {
          const result = await salesService.getSaleById(validMongoID, validSale);
          expect(result)
            .to.be.an('object')
            .that.has.property('err')
            .that.has.property('message', 'Sale not found');
        });

      });

      describe('A venda existe no Banco de Dados', () => {

        before(() => sinon.stub(salesModel, 'getSaleById').resolves(validSaleFromMongo));
        after(() => salesModel.getSaleById.restore());

        describe('Os produtos da venda não são válidos', () => {
      
          it('Falha na validação da quantidade e retorna o objeto de erro', async () => {
            const result = await salesService.updateSaleById(validMongoID, invalidSaleProductQuantity);
            expect(result)
              .to.be.an('object')
              .that.has.property('err')
              .that.has.property('message', 'Wrong product ID or invalid quantity');
          })
    
        })
    
        describe('Os produtos da venda são válidos', () => {
          
          before(() => sinon.stub(salesModel, 'updateSaleById').resolves(validSaleFromMongo));
          after(() => salesModel.updateSaleById.restore());

          it('Retorna o objeto da venda após atualização com as propriedades _id e itensSold', async () => {
            const result = await salesService.updateSaleById(validMongoID, validSale);
            expect(result).to.be.an('object');
            expect(result).to.have.property('_id');
            expect(result)
              .to.have.property('itensSold')
              .that.is.an('array')
              .that.has.length.greaterThan(0);
          });

        });
      });
    });
  });

  describe('Chama a função excludeSaleById', () => {
    describe('O id informado não é válido', () => {

      before(() => sinon.stub(salesModel, 'getSaleById').resolves(null));
      after(() => salesModel.getSaleById.restore());

      it('Falha na verificação do id e retorna o objeto de erro', async () => {
        const result = await salesService.excludeSaleById(invalidMongoID);
        expect(result)
          .to.be.an('object')
          .that.has.property('err')
          .that.has.property('message', 'Wrong sale ID format');
      })
    });

    describe('O id informado é válido', () => {
      describe('A venda não existe no Banco de Dados', () => {

        before(() => sinon.stub(salesModel, 'getSaleById').resolves(undefined));
        after(() => salesModel.getSaleById.restore());

        it('Falha na verificação do id e retorna o objeto de erro', async () => {
          const result = await salesService.excludeSaleById(validMongoID);
          expect(result)
            .to.be.an('object')
            .that.has.property('err')
            .that.has.property('message', 'Wrong sale ID format');
        })

      })

      describe('A venda existe no Banco de Dados', () => {

        before(() => {
          sinon.stub(salesModel, 'getSaleById').resolves(validSaleFromMongo);
          sinon.stub(salesModel, 'excludeSaleById').resolves(null);
          sinon.stub(productsModel, 'getProductById').resolves(validProductFromMongo);
          sinon.stub(productsModel, 'addToStockQuantity').resolves(null);
        });

        after(() => {
          salesModel.getSaleById.restore();
          salesModel.excludeSaleById.restore();
          productsModel.getProductById.restore();
          productsModel.addToStockQuantity.restore();
        });

        it('Exclui a venda com sucesso e retorna o objeto da venda excluída', async () => {
          const result = await salesService.excludeSaleById(validMongoID);
          expect(result).to.be.an('object');
          expect(result).to.have.property('_id');
          expect(result)
            .to.have.property('itensSold')
            .that.is.an('array')
            .that.has.length.greaterThan(0);
        });
      });
    });
  });
});
