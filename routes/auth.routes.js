const Router = require('express');
const controller = require('../auth.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/role.middleware');

const router = new Router();

router.post('/registration', [
  check('username', 'Username cannot be empty').notEmpty(),
  check('password', 'Password cannot be shorter than 4 and longer than 10 characters').isLength({ min: 4, max: 10 })
], controller.registration);

router.post('/login', controller.login);

router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers);

module.exports = router;
