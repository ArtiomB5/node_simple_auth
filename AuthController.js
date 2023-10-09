const User = require("./Models/User");
const Role = require("./Models/Role");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { validationResult } = require("express-validator");

dotenv.config();

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "User with such name have already been!" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ messahe: "New user has registered succesfully" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Registration error ${e.message}` });
    }
  }
  async login(req, res) {
    try {
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Registration failde ${e.message}` });
    }
  }
  async getUsers(req, res) {
    try {
      res.send("work");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Registration failde ${e.message}` });
    }
  }
}

module.exports = new AuthController();
