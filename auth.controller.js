const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Role = require('./models/Role');

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(400).json({ message: 'User already exist' });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: 'USER' });
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      return res.json({ message: 'User registered'})
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    } catch (e) {

    }
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({ value: 'ADMIN'});
      // await userRole.save();
      // await adminRole.save();
      res.json('Server is working...');
    } catch (e) {

    }
  }
}

module.exports = new authController();
