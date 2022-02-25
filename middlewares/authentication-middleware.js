const { verify } = require('../helpers/jwt-helper');
const { User } = require('../models/index');

async function authenticationMiddleware(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) throw { name: 'NoAccessToken' };
    const { id, email } = verify(access_token);
    const result = await User.findOne({ where: { email } });
    if (!result) throw { name: 'Unauthorized' };
    req.user =  {
      id: result.id,
      email: result.email,
      role: result.role
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authenticationMiddleware;
