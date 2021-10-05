const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectId } = require('mongodb');
const mongoDB = require('../../models/connection');
const testProd = require('../../models/Products');
const testSale = require('../../models/sales');
