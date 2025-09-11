// socket.js
import { io } from "socket.io-client";

let socket; 
export const initSocket = (token) => {
  socket = io("http://localhost:8000", {
    auth: { token },
  });
  return socket;
};

export const getSocket = () => socket;
