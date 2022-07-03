'use strict';

const express = require('express');
const basicAuth = require('../../auth/middleware/basic');
const bearerAuth = require('../../auth/middleware/bearer');
const acl = require('../../auth/middleware/acl');
const dataModules = require('../models/index');

const v2Router = express.Router();

v2Router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (dataModules[modelName]) {
    req.model = dataModules[modelName];
    next();
  } else {
    next('Invalid Model');
  }
});

v2Router.get('/:model/:id', basicAuth, handleGetOne);
v2Router.get('/:model', basicAuth, handleGetAll);
v2Router.post('/:model', bearerAuth, acl('create'), handleCreate);
v2Router.put('/:model/:id', bearerAuth, acl('update'), handleUpdate);
v2Router.patch('/:model/:id', bearerAuth, acl('update'), handleUpdate);
v2Router.delete('/:model/:id', bearerAuth, acl('delete'), handleDelete);

async function handleGetAll(req, res) {
  let allRecords = await req.model.findAll();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.findOne(id)
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}

async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj)
  res.status(200).json(updatedRecord);
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}
module.exports = v2Router;
