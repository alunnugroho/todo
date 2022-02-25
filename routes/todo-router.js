const TodoController = require('./../controllers/todo-controller');
const authorizationMiddleware = require('../middlewares/authorization-middleware');
const router = require('express').Router();

// GET /todo
router.get('/', TodoController.findAll);

// GET /todo/:id
router.get('/:id', TodoController.findById);

// POST /todo
router.post('/', TodoController.insertTodo);

// DELETE /todo/:id
router.delete('/:id', authorizationMiddleware, TodoController.deleteTodo);

// PUT /todo/:id
router.put('/:id', authorizationMiddleware, TodoController.updateTodo);

module.exports = router;
