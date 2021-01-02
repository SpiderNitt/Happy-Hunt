const { body } = require("express-validator");

module.exports = {
  AdminLoginValidator: [
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  AdminCreateValidator: [body("emailId").isEmail().notEmpty()],
  playerRegisterValidator: [
    body("name").isString().notEmpty(),
    body("emailId").isEmail().notEmpty(),

    body("phoneNo").isString().notEmpty(),
  ],
  playerLoginValidator: [
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
};
