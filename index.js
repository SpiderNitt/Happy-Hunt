require("dotenv").config({ path: "./src/env/.env" });
const express = require("express");
const cors = require("cors");
const path = require("path");
const { app } = require("./src/helpers/timer");

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

app.listen(port, () => console.log(`server started at port ${port}`));
