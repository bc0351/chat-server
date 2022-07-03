'use strict';
require('dotenv').config();

const { Sequelize, DataTypes } = require('sequelize');
const messagesModel = require('./messages');
const usersModel = require('./users');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

const messages = messagesModel(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  messages: messages,
  users: users
};
