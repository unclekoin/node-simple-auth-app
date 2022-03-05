const Router = require('express');
const controller = require('../auth.controller');
const { check } = require('express-validator');

const router = new Router();

router.post('/registration', [
  check('username', 'Username cannot be empty').notEmpty(),
  check('password', 'Password cannot be shorter than 4 and longer than 10 characters').isLength({ min: 4, max: 10 })
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;
