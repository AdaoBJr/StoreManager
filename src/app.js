const express = require('express');

const nextErrors = require('./api/errors/nextErrors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_request, response) => response.send());

app.use(nextErrors);

module.exports = app;
