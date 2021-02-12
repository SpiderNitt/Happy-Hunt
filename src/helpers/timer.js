/* eslint-disable no-await-in-loop */
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("../database/setup");

const options = {
  cors: {
    origin: "https://www.hhc.eventspeciale.com/",
  },
};
const io = require("socket.io")(server, options);
// io.origins("*:*");

module.exports = { server, app, io };
