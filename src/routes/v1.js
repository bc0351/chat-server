const express = require('express');
const dataModules = require('../models/index');
const v1Router = express.Router();

v1Router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

v1Router.get('/messages', (req, res, next) => {
  res.render('index', { title: 'Express Chat App' });
});

module.exports = v1Router;
