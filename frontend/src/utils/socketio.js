import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  console.log(socket.id);
});

const listener = (...args) => {
  console.log(args);
};

const teamID = "abcd123";

socket.on(`Notification ${teamID}`, listener);
