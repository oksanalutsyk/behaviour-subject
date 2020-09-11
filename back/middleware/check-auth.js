const jwt = require('jsonwebtoken');
const { CONSOLE_APPENDER } = require('karma/lib/constants');

// module.exports = (req, res, next) => {
//   console.log('Authoresation start')
//   const token = req.headers['authorisation'];
//   if (!token) {
//     console.log('false')
//     return res.status(401).json({ auth: false, msg: 'No token, authorization denied' });
//   }
//   next()
//   console.log('true')
// }


module.exports = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ auth: false, msg: 'No token, authorization denied' });
  }
  // try {
  //   jwt.verify(token, 'ACCESS_TOKEN_SECRET');
  //   const decoded = jwt.verify(token, 'ACCESS_TOKEN_SECRET');

  //   // const user = await User.findOne({ name: decoded.name });
  //   // req.tempUser = user;
  //   next();
  // } catch (error) {
  //   console.log(error)
  //   res.status(401).json({ msg: 'Token is not valid' });
  // }
    next();
}