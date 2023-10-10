const Router = require("express");
const authController = require("./AuthController");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

const router = new Router();
const middlewares = [
  check("username", "Username can't be empty").notEmpty(),
  check(
    "password",
    "Password must be longer 4 symbols and shorter 10 symbols"
  ).isLength({ min: 5, max: 10 }),
];
router.post("/registration", middlewares, authController.registration);
router.post("/login", middlewares, authController.login);
router.get("/users", roleMiddleware(['USER']), authController.getUsers);

module.exports = router;
