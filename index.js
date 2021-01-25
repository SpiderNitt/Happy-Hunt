require("dotenv").config({ path: "./src/env/.env" });
const chalk = require("chalk");
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const { app } = require("./src/helpers/timer");

app.use(
  morgan((tokens, req, res) =>
    [
      chalk.hex("#ff4757").bold("REQUEST --> "),
      chalk.hex("#34ace0").bold(tokens.method(req, res)),
      chalk.hex("#ffb142").bold(tokens.status(req, res)),
      chalk.bold(tokens.url(req, res)),
      chalk.hex("#2ed573").bold(`${tokens["response-time"](req, res)} ms`),
      chalk.hex("#f78fb3").bold(`@ ${tokens.date(req, res)}`),
      chalk.yellow(tokens["remote-addr"](req, res)),
      chalk.hex("#1e90ff")(tokens["user-agent"](req, res)),
    ].join(" ")
  )
);
app.use(bodyParser.raw());
// session
app.use(
  session({
    secret: "happyHunt",
    resave: true,
    saveUninitialized: true,
  })
);

// routes

const authRouter = require("./src/api/auth");
const apiRouter = require("./src/api/api");

// connections
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("./Frontend/build"));

// app.use((req, res, next) => {
//   res.sendFile(`${__dirname}/frontend/build/index.html`);
// });
app.use("/auth", authRouter);
app.use("/api", apiRouter);
app.use((req, res) => {
  // console.log(err);
  // console.log("hello");
  console.log(chalk.red.bold(res.locals.error.message));
  return 0;
});
global.appRoot = path.resolve(__dirname);

const port = 3000;

app.listen(port, () =>
  console.log(chalk.blue.bold(`server started at port ${port}`))
);
