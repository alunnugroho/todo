const { Todo } = require("../models");

async function authorizationMiddleware(req, res, next) {
  try {
    const todo = await Todo.findByPk(req.params.id)
    if (!todo) throw { name: 'NotFound' }
    if (req.user.role !== 'admin') {
      if (req.user.id !== todo.UserId) throw { name: 'Forbidden' };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorizationMiddleware;
