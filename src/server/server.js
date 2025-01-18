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
} 