const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log(token)
  if (!token) {
    console.log('no token')
    return res.status(401).json({ auth: false, msg: 'No token, authorization denied' });
  }
  try {
    jwt.verify(token, 'secret_this_should_be_longer');
    const decoded = jwt.verify(token, 'secret_this_should_be_longer');
    console.log(decoded)

    const user = await User.findOne({ name: decoded.name });
    req.tempUser = user;
    console.log(user)
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Token is not valid' });
  }
}


