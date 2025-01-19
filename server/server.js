const express = require("express");
const http = require("http");
const cors = require("cors");
const twilio = require("twilio");
const { v4: uuid } = require("uuid");

const PORT = process.env.PORT || 5002;

const app = express();
const server = http.createServer(app);

app.use(cors());

let connectedUsers = [];
let rooms = [];
app.use("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params;
  console.log(roomId, "roomId from[params");
  const room = rooms.find((room) => room.id === roomId);
  console.log(room, "room from[find]");
  if (room) {
    // send if room exist
    console.log(`Room found: ${JSON.stringify(room)}`); // Debug log

    if (room.connectedUsers.length >= 3) {
      return res.send({
        roomExists: true,
        full: false,
      });
    } else {
      return res.send({
        roomExists: true,
        full: false,
      });
    }
  } else {
    //send response that room does not exist
    return res.send({
      roomExists: false,
      noroom: "yes",
    });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user with the ${socket.id} connected`);

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket);
  });
  // console.log("join head room")
  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket);
  });

  socket.on('disconnect', () => {
    disconnectHandler(socket);
  })

  socket.on('conn-signal', (data) => {
    signalHandler(data, socket);
  })
});

// socket handler

const createNewRoomHandler = (data, socket) => {
  console.log(`user is creating new room ${data}. ${socket.id}`);
  const { identity } = data;
  const roomId = uuid();
  // create a user object
  const newUser = {
    identity,
    id: uuid(),
    socketId: socket.id,
    roomId,
  };
  // push user to connected users
  connectedUsers = [...connectedUsers, newUser];

  // create new room
  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  };

  // join socket io room
  socket.join(roomId);

  rooms = [...rooms, newRoom];
  // emit to that client which created that room roomId
  socket.emit("room-id", { roomId });
  // emit an event to all users connected to that room about new users which are right in this room
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers });
};

const joinRoomHandler = (data, socket) => {
  const { identity, roomId } = data;

  const newUser = {
    identity,
    id: uuid(),
    socketId: socket.id,
    roomId,
  };

  //console.log(newUser, "newuser");

  //  join room as user who is trying to join room passing ID
  const room = rooms.find((room) => room.id === roomId);

  // Check if the user already exists in the connectedUsers array
  const userExists = connectedUsers.find(
    (user) => user.identity === identity && user.roomId === roomId
  );

  if (!userExists) {
    room.connectedUsers = [...room.connectedUsers, newUser];
    // we need to join socket io room
    socket.join(roomId);
    // add new user to users area
    connectedUsers = [...connectedUsers, newUser];

   // console.log(connectedUsers, "connectedUsers");

//    emit to all users which are already in the room to prepare connections
room.connectedUsers.forEach(user => {
    if(user.socketId !== socket.id) {
        const data = {
            connUserSocketId: socket.id,
        };

        io.to(user.socketId).emit('conn-prepare', data);
    }
})
    // emit an event to all users connected to that room about new users which are right in this room
    io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers });
  } else {
    console.log("User already exists in the room");
  }
};

const disconnectHandler = (socket) => {
    //find if user has beeen register if yes remive 
    const user = connectedUsers.find((user) => user.socketId === socket.id)
    if (user) {
        // remove user 
        const room = rooms.find((room) => room.id === user.roomId);
        room.connectedUsers = room.connectedUsers.filter(
            user => user.socketId !== socket.id);
        socket.leave(user.roomId);

        // emit an event to  all user who left the room
        
        // TODO
        // close the room if amount of the users which will stay in room 
        if (room.connectedUsers.length > 0 ) {
            io.to(room.id).emit('room-update', {
                connectedUsers: room.connectedUsers
            })
        } else {
            room = rooms.filter(r => r.id !== room.id);
        }
    }
}

const signalHandler = (data, socket) => {
    const { connUserSocketId, signal } = data;
    const signalingData = { signal, connUserSocketId: socket.id };
    io.to(connUserSocketId).emit('conn-signal', signalingData)
}

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
