require("dotenv").config({ path: "./src/env/.env" });
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const { server, app } = require("./src/helpers/timer");

if (!fs.existsSync("./media")) {
  fs.mkdirSync("./media");
  fs.mkdirSync("./media/profileMedia");
  fs.mkdirSync("./media/submissionMedia");
  fs.mkdirSync("./media/missionMedia");
}
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

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

app.use(express.static("./frontend/build"));
app.use((req, res) => {
  res.sendFile(`${__dirname}/frontend/build/index.html`);
});
const port = 3000;

server.listen(port, () => console.log(`server started at port ${port}`));
