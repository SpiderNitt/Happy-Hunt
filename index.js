require("dotenv").config({ path: "./src/env/.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { app } = require("./src/helpers/timer");

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
app.use("/auth", authRouter);
app.use("/api", apiRouter);
global.appRoot = path.resolve(__dirname);
const port = 3000;

app.use(express.static("frontend/build"));

app.use((req, res) => {
  res.sendFile(`${__dirname}/frontend/build/index.html`);
});

app.listen(port, () => console.log(`server started at port ${port}`));
