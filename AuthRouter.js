const Router = require("express");
const authController = require("./AuthController");
const { check } = require("express-validator");

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Username can't be empty").notEmpty(),
    check(
      "password",
      "Password must be longer 4 symbols and shorter 10 symbols"
    ).isLength({ min: 5, max: 10 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
