const Router = require("express").Router();
const { validationResult } = require("express-validator");
const User = require("../../database/models/User");
const { AdminCreateValidator } = require("../../middlewares/expressValidator");

Router.post("/", AdminCreateValidator, async (req, res) => {
  try {
    const issuperadmin = await User.findById(req.jwt_payload.id);
    if (issuperadmin.Role !== "SuperAdmin") {
      return res.status(402).json({
        message: "You don't have permission to perform the operation",
      });
    }
    const { emailId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (emailId !== undefined) {
      if (!(await User.findOne({ Id: emailId }))) {
        return res.status(404).json({ message: "no such user found" });
      }

      await User.deleteOne({ Id: emailId });
      return res.status(200).json({ message: "user deleted sucessfully" });
    }
    return res.status(401).json({ message: "emailId provided was undefined" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});

module.exports = Router;
