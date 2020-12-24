const { body } = require("express-validator");

module.exports = {
  InputValidator: [
    body("adminID").isString().notEmpty(),
    body("password").isString().notEmpty(),
  ],
};
