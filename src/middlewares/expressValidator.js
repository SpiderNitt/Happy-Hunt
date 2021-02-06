const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");

module.exports = {
  AdminCreateValidator: [body("emailId").isEmail().notEmpty()],
  playerRegisterValidator: [
    body("name").isString().notEmpty(),
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
    body("phoneNo").isString().notEmpty(),
  ],
  loginValidator: [
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  resetValidator: [
    body("verificationId").notEmpty(),
    body("emailId").isEmail().notEmpty(),
    body("password").isString().notEmpty(),
  ],
  MissionValidator: [
    body("Category").isString().notEmpty(),
    body("isBonus").isBoolean().notEmpty(),
    body("statement").isArray().notEmpty(),
    body("answer_Type").isString().notEmpty(),
    body("MissionName").isString().notEmpty(),
    body("answer").isArray().notEmpty(),
    body("Feed").isBoolean().notEmpty(),
    body("ServerEvaluation").isBoolean().notEmpty(),
    body("Other_Info").isString().optional(),
    body("maxPoints").isNumeric().notEmpty(),
    body("Hints").isString().optional(),
    body("Location.Long").isNumeric(),
    body("Location.Lat").isNumeric(),
  ],
  UpdateMissionValidator: [
    body("id").notEmpty(),
    body("Category").isString().optional(),
    body("clue").isArray().optional(),
    body("isBonus").isBoolean().optional(),
    body("answer_Type").isString().optional(),
    body("answer").isArray().optional(),
    body("MissionName").isString().optional(),
    body("Feed").isBoolean().optional(),
    body("ServerEvaluation").isBoolean().optional(),
    body("Other_Info").isString().optional(),
    body("maxPoints").isNumeric().optional(),
    body("Hints").isString().optional(),
    body("Location.Long").isNumeric().optional(),
    body("Location.Lat").isNumeric().optional(),
  ],
  AcceptValidator: [
    body("isAccepted").notEmpty().isBoolean(),
    body("activityfeedId").notEmpty(),
  ],
};
