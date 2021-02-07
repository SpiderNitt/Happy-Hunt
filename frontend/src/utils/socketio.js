// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000/");

// socket.on("connect", () => {
//   console.log(socket.id);
// });

// const listener = (...args) => {
//   console.log(args);
// };

// const setUnlock = () => {
//   console.log("New set Unlocked");
// };

// const userInfo = JSON.parse(localStorage.getItem("userInfo"));
// const teamID = userInfo.team;

// socket.on(`Notifications ${teamID}`, listener);

// socket.on(`Notifications`, listener);

// socket.on(`missions`, setUnlock);

import React, { useState } from "react";
import Message from "../components/Message";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log(socket.id);
});

const listener = (...args) => {
  console.log(args);
};

const setUnlock = () => {
  console.log("New set Unlocked");
};

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const teamID = userInfo.team;

socket.on(`Notifications ${teamID}`, listener);

socket.on(`Notifications`, listener);

socket.on(`missions`, setUnlock);
