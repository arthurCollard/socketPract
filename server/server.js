const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on('connection', socket => {
    const id = socket.handshake.query.id
    if (!id) return

    //connecting
    console.log(`connecting as ...${id}`)
    socket.join(id)

    socket.broadcast.emit('player-joined', id)
    // connectedUsers.push(id)

    
    //receiving message
    socket.on('add-number', ({text}) => {
        console.log(id, text)
        socket.broadcast.emit("add-number-response", text)
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('player-leave', id)
    })
})

httpServer.listen(5000)