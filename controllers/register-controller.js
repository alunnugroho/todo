const { User } = require('./../models/index');

class RegisterController {
  
  static async register(req, res, next) {
    const { username, email, password, role } = req.body;
    try {
      const result = await User.create({ username, email, password, role });
      res.status(201).json({
        id: result.id,
        username: result.username,
        email: result.email
      });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = RegisterController;
