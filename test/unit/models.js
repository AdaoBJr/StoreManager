const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoDB = require('../../models/connection');
const testProd = require('../../models/Products');
const testSale = require('../../models/sales');

const database = new MongoMemoryServer();

const connect = async () {
    const URL = await database.getUri();
    const OPTIONS = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    return MongoClient.connect(URL, OPTIONS);
};

describe('Testing products list', () => {
    describe('Testing products in storage', () => {
        const payload = { name: 'Produto', quantity: 840};
        describe('response', () => {
            before(async () => {
                const mockConn = await connect();
                sinon.stub(MongoClient, 'connect').resolves(mockConn);
                await mockConn.db('StoreManager').collection('products').insertOne(payload);
              });
            })
        })

    })
});
