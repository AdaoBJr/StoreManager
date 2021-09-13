// const express = require('express');

// const app = express();
// app.use(express.json());

// const Product = require('./controllers/productsControllers');

// app.post('/products', async (req, res) => {
//   const { name, quantity } = req.body;
//   const product = await ProductModel.create({ name, quantity });  

//   res.status(201).json(product);
// });

// app.get('/products', async (req, res) => {
//   const products = await ProductModel.getAll();

//   res.status(200).json(products);
// });

// app.get('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const productId = await ProductModel.findById(id);

//   res.status(200).json(productId);
// });

// app.put('/products/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, quantity } = req.body;
//   console.log(name, quantity);

//   await ProductModel.update({ id, name, quantity });

//   return res.status(200).json({
//     _id: id,
//     name,
//     quantity,
//   });
// });

// app.delete('/products/:id', async (req, res) => {
//   const { id } = req.params;
  
//   const deleted = await ProductModel.exclude(id);

//   res.status(200).send(deleted);
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log('listening on port', PORT));

// // não remova esse endpoint, e para o avaliador funcionar
// app.get('/', (_request, response) => {
//   response.send();
// });
const express = require('express');

const app = express();
app.use(express.json());
const router = require('./routes/router');

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log('listening on port', PORT));