require("dotenv").config({ path: "./src/env/.env" });

const cors = require("cors");

const express = require("express");

const path = require("path");

const app = express();
const port = process.env.APP_PORT;
require("./src/database/setup.js");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

global.appRoot = path.resolve(__dirname);

app.listen(port, () => console.log(`server started at port ${port}`));
