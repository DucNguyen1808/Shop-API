const Product = require('../models/Product');
const createError = require('http-errors');
class UserContrller {
  async index(req, res, next) {
    try {
      const product = await Product.find();
      return res.status(200).json({data: product});
    } catch (err) {
      return next(createError(500, err.message));
    }
  }
}
module.exports = new UserContrller();
