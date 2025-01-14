import { Server } from "socket.io"
import { uuid as v4} from "uuid"
const twillo = require("twilio")

const SocketHandler = (req, res) => {

    if (res.socket.server.io) {
        console.log("Socket already connected")
    } else {
        const io = new Server(res.socket.server)

        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log("server connected")

            // socket.on("join-room", (roomId, userId) => {
            //     console.log("new user from websocket")
            //     console.log("a new user with id " + roomId + " joined" + userId);
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-connected", userId) // id == userId
            // })

            // socket.on("user-toggle-audio", (userId, roomId) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-toggle-audio", userId)
            // })

            // socket.on("user-toggle-video", (userId, roomId) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-toggle-video", userId)
            // })

            

            // socket.on("user-leave", (userId, roomId) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-leave", userId)
            // })


            // socket.on("user-to-sharing-screen", ({userId, roomId}) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-to-sharing-screen", userId)
            // })

            // socket.on("user-started-sharing", ({userId, roomId, screenStream}) => {
            //     socket.join(roomId);
            //     socket.broadcast.to(roomId).emit("user-started-sharing", { userId, screenStream });
            //     console.log("user with the " + userId + " started sharing screen");
            //     console.log(screenStream, "stream loging in socketjs")
            // });

            

        })
    }
    res.end()
}

export default SocketHandler;