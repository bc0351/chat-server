'use strict';

const uuid = require('uuid').v4;

const messagesModel = (sequelize, DataTypes) => sequelize.define('Message', {
  messageId: {type: DataTypes.STRING, required: true, defaultValue: uuid()},
  username: {type: DataTypes.STRING, required: true, defaultValue: 'anonymous'},
  message: {type: DataTypes.STRING, required: true},
  timestamp: {type: DataTypes.DATE, required: true, defaultValue: new Date()}
})

module.exports = messagesModel;
