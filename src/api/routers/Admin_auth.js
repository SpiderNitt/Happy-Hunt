const loginRouter = require("express").Router();
const { body, validationResult } = require("express-validator");
const { createJWTtoken } = require("../../middlewares/jwt");

const { InputValidator } = require("../../middlewares/adminAuthValidator");

const User = require("../../database/models/User");

loginRouter.post("/", InputValidator, async (req, res) => {
  try {
    const { adminID, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (adminID !== undefined || password !== undefined) {
      const user = await User.findOne({ Id: adminID });
      if (user === null) {
        return res.status(404).json({ message: "No user found" });
      }
      // creation of token
      const token = createJWTtoken(user);
      console.log("token", token);
      return res.status(200).json({ JWTtoken: token });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = loginRouter;
