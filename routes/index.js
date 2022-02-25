const router = require('express').Router();
const todoRouter = require('./todo-router');
const errorHandler = require('./../middlewares/error-handler-middleware');
const RegisterController = require('../controllers/register-controller');
const SignInController = require('../controllers/sign-in-controller');
const authenticationMiddleware = require('../middlewares/authentication-middleware');

// GET /
router.get('/', (req, res) => {
  res.render('home');
});

// POST /register
router.post('/register', RegisterController.register);

// POST /sign-in
router.post('/sign-in', SignInController.signIn);

router.use(authenticationMiddleware);

router.use('/todo', todoRouter);
router.use(errorHandler);

module.exports = router;
