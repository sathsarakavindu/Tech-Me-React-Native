import { io } from "socket.io-client";

export const socket = io("http://192.168.8.125:5000", {
  autoConnect: true,
  transports: ["websocket"]
});
