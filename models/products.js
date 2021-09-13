// Importando função de conexão! (Se deve ser um ponto de atenção!!)
const { ObjectId } = require('mongodb'); 
const connection = require('./connections');

// Aqui faremos o CRUD! Deletaremos, criaremos e atualizamos todas informações do nosso banco
// O model é responsável por manipular o banco de dados

// Find para não duplicar o banco de dados
const findForNotDuplicate = async (name) => {
    const db = await connection();
    const ifProductExist = await db.collection('products').findOne({ name });
    return ifProductExist;
};

// Aqui estou manipulando e criando um produto!
const addProduct = async (name, quantity) => {
    const db = await connection();
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
};

const findAll = async () => {
    const db = await connection();
    const product = await db.collection('products').find().toArray();
    return product;
};

const findById = async (id) => {
    const db = await connection();
    console.log('FindbyId no model');
    const product = await db.collection('products').findOne({ _id: ObjectId(id) });
    return product;
};
// Aqui estou exportando este produto!
module.exports = {
    addProduct,
    findForNotDuplicate,
    findAll,
    findById,
};