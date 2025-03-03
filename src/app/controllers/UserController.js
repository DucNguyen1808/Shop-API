const User = require('../models/user');
const {userValidation} = require('../../utils/validation');
const {signToken, verifyRefershToken} = require('../../services/jwtService.js');
const createError = require('http-errors');
class UserContrller {
  async index(req, res) {
    const users = await User.find();
    return res.status(200).json({data: users});
  }
  async register(req, res, next) {
    try {
      const {error} = userValidation(req.body);
      if (error) {
        throw createError(error.details[0].message);
      }

      const {name, email, password} = req.body;
      const user = await User.create({name, email, password});

      return res.status(200).json({
        status: 200,
        message: 'Create user successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        throw createError.NotFound('user not register');
      }

      const isvalidate = await user.checkPassword(password);

      if (!isvalidate) {
        throw createError.Unauthorized('Sai mật khẩu');
      }
      const accessToken = await signToken(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        '10m',
      );
      const refreshToken = await signToken(
        user,
        process.env.REFRESH_TOKEN_SECRET,
        '2h',
      );
      return res.status(200).json({
        message: 'login successfully',
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      const payload = await verifyRefershToken(refreshToken);
      const accessToken = await signToken(
        payload._id,
        process.env.ACCESS_TOKEN_SECRET,
        '2h',
      );
      const newRRefreshToken = await signToken(
        payload._id,
        process.env.REFRESH_TOKEN_SECRET,
        '2h',
      );

      return res.json({
        accessToken,
        refreshToken: newRRefreshToken,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserContrller();
