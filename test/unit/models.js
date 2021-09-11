const sinon = require('sinon');
const { expect } = require('chai');
const ProductsModel = require('../../models/productModel');
const connection = require('../../models/connection');
const { MongoClient, ObjectId } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-core');
