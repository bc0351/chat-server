'use strict';
const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');

const authRoutes = require('../auth/routes/index');
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = app;
