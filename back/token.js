const jwt = require('jsonwebtoken');


const generateAccessToken = (data) => {
  const token = jwt.sign(data, 'ACCESS_TOKEN_SECRET');
  return token
};

const generateRefreshToken = (data) => {
  const token = jwt.sign(data, 'REFRESH_TOKEN_SECRET');
  return token
};

const generateNameToken = (data) => {
  const token = jwt.sign(data, 'NAME_TOKEN_SECRET', { expiresIn: "1d" });
  return token
};

module.exports = {
  generateRefreshToken,
  generateAccessToken,
  generateNameToken,
};