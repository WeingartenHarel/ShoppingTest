module.exports = connectSockets
function connectSockets(io) {
    io.on('connection', socket => {

        // tests
        console.log('CONNECTED ID:', socket.id);

        // messages sockets 
        socket.on("message", (message) => {
            socket.broadcast.emit('message-to-all' ,'hello world' )
          });

        socket.on('join room', room => {
            socket.username = 'user';
            io.to(room).emit('user joined', { name: 'System message', txt: 'New user has joind the chat' });

            if (socket.myRoom) {
                console.log('LEAVED ROOM ', socket.myRoom);
                socket.leave(socket.myRoom)
            }
            socket.join(room);
            socket.myRoom = room;
            console.log('JOINED ROOM ', room);
        })
    })
}