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

server.listen(PORT,() => {
    console.log(`Server is listening on ${PORT}`);
    
} )