import io from "socket.io-client";
import store from "@/store/store";
import { setRoomId, setParticipants } from "@/store/action";
import * as webRTCHandler from "./webRtcHandler";

const SEVER = "http://localhost:5002";

let socket = null;
socket = io(SEVER);

export const connectWithSocketIOSERVER = () => {
  // socket = io(SEVER);

  socket.on("connect", () => {
    console.log("Connected to server");
    console.log(socket.id);
  });

  socket.on("room-id", (data) => {
    const { roomId } = data;
    store.dispatch(setRoomId(roomId));
  });

  socket.on("room-update", (data) => {
    const { connectedUsers } = data;
    store.dispatch(setParticipants(connectedUsers));
  });

  socket.on("conn-prepare", (data) => {
    const { connUserSocketId } = data;
    webRTCHandler.prepareNewPeerConnection(connUserSocketId, false)
  });
  socket.on('conn-signal', (data) => {
    webRTCHandler.handleSignalingData(data)
  })
};

export const createNewRoom = (identity) => {
  // emit in server that would crreate new room
  // socket = io(SEVER);
  const data = {
    identity,
  };
  socket.emit("create-new-room", data);
};

export const joinRoom = (identity, roomId) => {
  // emit in server that would join room
  //socket = io(SEVER);
  const data = {
    identity,
    roomId,
  };
  socket.emit("join-room", data);
};


export const signalPeerData = (data) => {
    socket.emit('conn-signal', data);
};

