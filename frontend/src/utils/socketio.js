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

const socket = io("https://www.hhc.eventspeciale.com/");

socket.on("connect", () => {
  console.log(socket.id);
});

const listener = (...args) => {
  console.log(args);
};

const setUnlock = () => {
  console.log("New set Unlocked");
};

let userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo) {
  if (userInfo.team !== undefined) {
    socket.on(`Notifications ${userInfo.team}`, listener);
  }
}
socket.on(`Notifications`, listener);

socket.on(`missions`, setUnlock);

function Socketio(props) {
  const [message, setMessage] = useState("");
  const listener = (...args) => {
    console.log(args);
    setMessage(args[0]);
  };
  if (userInfo) {
    if (userInfo.team !== undefined) {
      socket.on(`Notifications ${userInfo.team}`, listener);
    }
  }
  const setUnlock = () => {
    console.log("New set Unlocked");
    setMessage("New set Unlocked");
  };
  socket.on(`missions`, setUnlock);
  return (
    <>
      {message && (
        <Message
          message={message}
          type='info'
          show={true}
          setMessage={setMessage}
        />
      )}
    </>
  );
}

export default Socketio;
