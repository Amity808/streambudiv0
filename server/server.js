const express = require("express");
const http = require("http");
const cors = require("cors");
const twilio = require("twilio");
const { v4: uuid } = require("uuid")

const PORT = process.env.PORT || 5002

const app = express();
const server = http.createServer(app);

app.use(cors());


let connectUsers = []
let rooms = []

app.use('/api/room-exists/:roomId', (req, res) => {
    const { roomId } = req.params;
    const room = rooms.find(room => room.id === roomId)
    if(room) {
        // send if room exist
        if (room.connectedUsers.length > 3) {
            return res.send({
                roomExists: true, full: true
            })
        } else {
            return res.send({
                roomExists: false, full: false
            })
        }
    } else {
        //send response that room does not exist
        return res.send({
            roomExists: false
        })
    }
})

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`user with the ${socket.id} connected`)

    socket.on("create-new-room", (data) => {
        createNewRoomHandler(data, socket)
    })
})


// socket handler

const createNewRoomHandler = (data, socket) => {
    console.log(`user is creating new room ${data}. ${socket.id}`)
    const { identity } = data
    const roomId = uuid()
    // create a user object 
    const newUser = {
        identity,
        id: uuid(),
        socketId: socket.id,
        roomId: roomId
    }
    // push user to connected users 
    connectUsers = [...connectUsers, newUser];

    // create new room
    const newRoom = {
        id: roomId,
        connectedUsers: [newUser]
    }

    // join socket io room
    socket.join(roomId);

    rooms = [...rooms, newRoom];
    // emit to that client which created that room roomId 
    socket.emit('room-id', { roomId })
    // emit an event to all users connected to that room about new users which are right in this room 
    socket.emit('room-update', { connectedUsers: newRoom.connectedUsers })
}


server.listen(PORT,() => {
    console.log(`Server is listening on ${PORT}`);
    
} )