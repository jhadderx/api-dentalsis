const express = require('express');

const productsRouter = require('./products.router');
const citasRouter = require('./citas.router');
const dentistasRouter = require('./dentistas.router');
const usersRouter = require('./users.router');



function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router)
  router.use('/products', productsRouter);
  router.use('/citas', citasRouter);
  router.use('/dentistas', dentistasRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
