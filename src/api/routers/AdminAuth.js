const loginRouter = require("express").Router();
const { validationResult } = require("express-validator");
const { createJWTtoken } = require("../../middlewares/jwt");
const { AdminLoginValidator } = require("../../middlewares/expressValidator");
const User = require("../../database/models/User");

loginRouter.post("/login", AdminLoginValidator, async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (emailId !== undefined || password !== undefined) {
      const user = await User.findOne({ Id: emailId });

      if (user === null) {
        return res.status(404).json({ message: "No user found" });
      }
      if (user.password === password) {
        const token = createJWTtoken(user);
        req.session.token = token;
        console.log("token", token);

        return res.status(200).json({ JWTtoken: token });
      }
      return res.status(401).json({ message: "incorrect password" });
    }
    return res.status(401).json({ message: "emailId provided was undefined" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = loginRouter;
