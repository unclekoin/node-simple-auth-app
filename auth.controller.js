const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');
const User = require('./models/User');
const Role = require('./models/Role');

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, config.get('secretKey'), { expiresIn: '24h' });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registration error', errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User already exist' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      // const userRole = await Role.findOne({ value: 'ADMIN' });
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      return res.json({ message: 'User registered' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${ username } not found` });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Wrong password' });
      }

      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({ value: 'ADMIN'});
      // await userRole.save();
      // await adminRole.save();
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new authController();
