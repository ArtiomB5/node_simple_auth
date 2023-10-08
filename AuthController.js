const User = require("./Models/User");
const Role = require("./Models/Role");

class AuthController {
  async registration(req, res) {
    try {
    } catch (e) {}
  }
  async login(req, res) {
    try {
    } catch (e) {}
  }
  async getUsers(req, res) {
    try {
      const userRole = new Role();
      const adminRole = new Role({ value: "ADMIN" });
      await userRole.save();
      await adminRole.save();

      res.send("work");
    } catch (e) {}
  }
}

module.exports = new AuthController();
