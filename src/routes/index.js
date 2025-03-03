const userRouter = require('./user');
const productRouter = require('./product');
const router = require('express').Router();
const createError = require('http-errors');

const routerApi = function (app) {
  router.use('/user', userRouter);
  router.use('/products', productRouter);
  router.use((req, res, next) => {
    next(createError(404, 'Not found!'));
  });

  app.use('/api', router);
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      status: err.status || 500,
      message: err.message,
    });
  });
};

module.exports = routerApi;
