const { Todo, User } = require('./../models/index');

class TodoController {
  static async findAll(req, res, next) {
    try {
      const todo = await Todo.findAll();
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
  
  static async findById(req, res, next) {
    const { id } = req.params;
    try {
      const todo = await Todo.findByPk(id, {
        include: {
          model: User,
          attributes: {
            exclude: ['password']
          }
        }
      });
      if (!todo) throw { name: 'NotFound' };
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  }
  
  static async insertTodo(req, res, next) {
    const { title, description, due_date, UserId } = req.body;
    try {
      const result = await Todo.create({ title, description, due_date, UserId });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
  
  static async deleteTodo(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Todo.destroy({ where: { id } });
      if (!result) throw { name: 'NotFound' };
      res.status(200).json({ message: 'todo has been successfully deleted' });
    } catch (error) {
      next(error);
    }
  }
  
  static async updateTodo(req, res, next) {
    const { id } = req.params;
    const { title, description, due_date } = req.body;
    try {
      const result = await Todo.update({ title, description, due_date }, { where: { id }, returning: true });
      if (!result[0]) throw { name: 'NotFound' };
      res.status(200).json(result[1][0]);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
