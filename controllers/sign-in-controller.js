const { compare } = require('../helpers/hash-helper');
const { sign } = require('../helpers/jwt-helper');
const { User } = require('./../models/index');

class SignInController {
  
  static async signIn(req, res, next) {
    const { email, password } = req.body
    const failSignIn = 'SignInFailed'
    try {
      const user = await User.findOne({
        where: { email: email }
      });
      
      if (!user) {
        throw { name: failSignIn }
      }
      
      const comparePassword = compare(password, user.password)
      if (!comparePassword) {
        throw { name: failSignIn }
      }
      
      const token = await sign({
        id: user.id,
        email: user.email
      })
      
      res.status(200).json({ token })
    } catch (error) {
      next(error)
    }
  }
  
}

module.exports = SignInController;
