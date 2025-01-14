let connectUsers = []


import { Server } from "socket.io"
import { uuid as v4} from "uuid"
const twillo = require("twilio")

const SocketHandler = (req, res) => {

    let connectedUsers = []
    let room = [];

    

    if (res.socket.server.io) {
        console.log("Socket already connected")
    } else {
        const io = new Server(res.socket.server)

        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log("server connected")     
        })
    }
    res.end()
}

export default SocketHandler;