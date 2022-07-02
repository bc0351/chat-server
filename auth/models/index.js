'use strict';
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const usersModel = require('./users/');

const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';

const sequelize = new Sequelize(DATABASE_URL);

const food = foodModel(sequelize, DataTypes);
const clothes = clothesModel(sequelize, DataTypes);
const users = usersModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  users: users
};
