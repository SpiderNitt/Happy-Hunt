const { body } = require("express-validator");

module.exports = {
  InputValidator: [
    body("adminID").isString().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  playerRegisterValidator: [
    body("name").isString().notEmpty(),
    body("emailId").isEmail().notEmpty(),
    body("age").isNumeric().notEmpty(),
    body("phoneNo").isString().notEmpty(),
  ],
  playerLoginValidator: [
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
};
