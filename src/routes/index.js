const userRouter = require("./user");
const router = require("express").Router();
const routerApi = function (app) {
  router.use("/user", userRouter);
  router.use("/product", userRouter);
  
  app.use('/api',router)
};

module.exports = routerApi;
