const Router = require("express").Router();
const countdown = require("countdown");

Router.get("/", (req, res) => {
  const time = countdown(null, new Date(2021, 0, 15));
  delete time.units;
  delete time.value;
  delete time.years;
  delete time.months;

  res.status(200).json({ timeReamaining: time });
});
module.exports = Router;
