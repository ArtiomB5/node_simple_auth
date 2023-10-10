const User = require("./Models/User");
const Role = require("./Models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

const generateAccessToken = (id, roles) => {
  const payload = {id, roles};
  const secret = process.env.JWT_SECRET;
  
  return jwt.sign(payload, secret, {expiresIn: "5h"});
}

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Login error", errors });
      }
      const { username, password } = req.body;
      const user = await User.findOne({username});
      if (!user) {
        return res.status(400).json({message: `User ${username} is not found!`});
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: "Wrong username or password!"})
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({token});
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Registration failde ${e.message}` });
    }
  }
  async getUsers(req, res) {
    console.log('getUsers', req.user);
    try {
      const users = await User.find();
      if (!users) {
        return res.status(400).json({message: `Users are not found!`});
      }
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: `Registration failde ${e.message}` });
    }
  }
}

module.exports = new AuthController();
