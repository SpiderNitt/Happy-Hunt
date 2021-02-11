/* eslint-disable no-await-in-loop */
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("../database/setup");

const options = {
  cors: {
    origin: "http://localhost:3001",
  },
};
const io = require("socket.io")(server, options);
// io.origins("*:*");

module.exports = { server, app, io };
