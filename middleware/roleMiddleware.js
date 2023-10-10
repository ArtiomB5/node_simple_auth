const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(403).json({ message: "User is unauthorised" });
      }

      const secret = process.env.JWT_SECRET;
      const decodedData = jwt.verify(token, secret);
      let isHasRole = false;

      roles.forEach(role => {
        if (decodedData.roles.includes(role)) {
            isHasRole = true;
        }
      });;

      if (!isHasRole) {
        return res.status(403).json({ message: "You have no access!" });
      }
      next();
    } catch (e) {
      console.log(roles);
      console.log("role middleware error", e);
      return res.status(403).json({ message: "Authorisation Error" });
    }
  };
};
