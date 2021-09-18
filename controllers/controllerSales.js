const express = require('express');
const rescue = require('express-rescue');
const { validateSales } = require('../validate/validateSales');

const route = express.Router();

route.post('/', validateSales, rescue(async (req, res) => {
  res.status(201).json('post');
}));

route.get('/', rescue(async (_req, res) => {
  res.status(200).json('right');
}));

module.exports = route;
