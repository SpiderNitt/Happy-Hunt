/* eslint-disable no-await-in-loop */
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("../database/setup");

const options = {
  /* ... */
};
const io = require("socket.io")(server, options);

module.exports = { server, app, io };
