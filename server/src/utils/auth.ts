import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({
      message: err.message,
    });
  }
};

const { JWT_SECRET } = require('../config/envConfig');
module.exports.hashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
module.exports.comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};
module.exports.createToken = (user) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '7d',
  });
};
