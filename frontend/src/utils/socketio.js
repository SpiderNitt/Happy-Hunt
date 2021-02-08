import React, { useState } from "react";
import Message from "../components/Message";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");

socket.on("connect", () => {
  // console.log(socket.id);
});

const listener = (...args) => {
  console.log(args);
};

const setUnlock = () => {
  console.log("New set Unlocked");
};

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (userInfo.team !== undefined) {
  socket.on(`Notifications ${userInfo.team}`, listener);
}

socket.on(`Notifications`, listener);

socket.on(`missions`, setUnlock);

function Socketio(props) {
  const [message, setMessage] = useState("");
  return (
    <>
      {message && (
        <Message message={message} messageType='info' setMessage={setMessage} />
      )}
    </>
  );
}

export default Socketio;
