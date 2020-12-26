const { body } = require("express-validator");

module.exports = {
  InputValidator: [
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  InputValidator2: [body("emailId").isEmail().notEmpty()],
};
