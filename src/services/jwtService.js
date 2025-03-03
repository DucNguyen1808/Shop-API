const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const signToken = async (userId, secretKey, expiresIn) => {
  return new Promise((res, rej) => {
    const payload = {
      userId,
    };
    console.log(secretKey);
    JWT.sign(payload, secretKey, {expiresIn: expiresIn}, (error, token) => {
      if (error) {
        rej(error);
      }
      res(token);
    });
  });
};

const verifyAccessToken = async (req, res, next) => {
  try {
    if (!req.headers['authorization']) {
      return next(createError.Unauthorized());
    }
    const Bearertoken = req.headers['authorization'];
    const token = Bearertoken.split(' ')[1];
    console.log(Bearertoken);
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        if (err.name === 'JsonWebTokenError') {
          return next(createError.Unauthorized());
        }
        return next(createError.Unauthorized(err.message));
      }
      req.payload = payload;
      next();
    });
  } catch (error) {
    next(error);
  }
};

const verifyRefershToken = async (refershToken) => {
  return new Promise((res, rej) => {
    JWT.verify(
      refershToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, payload) => {
        if (err) {
          return rej(err);
        }
        return res(payload);
      },
    );
  });
};

module.exports = {signToken, verifyAccessToken, verifyRefershToken};
