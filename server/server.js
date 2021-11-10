const httpServer = require('http').createServer()
const io = require('socket.io')(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

let connectedUsers = []
let readiedUsers = []

io.on('connection', socket => {
    const id = socket.handshake.query.id
    if (!id) return

    //connecting
    console.log(`connecting as ...${id}`)
    socket.join(id)
    connectedUsers.push(id)

    //receiving message
    socket.on('add-number', ({text}) => {
        console.log(id, text)
        socket.broadcast.emit("add-number-response", text)
    })

    socket.on('random-number', () => {
        const endingNumber = Math.floor(Math.random() * 3000)
        socket.broadcast.emit("random-number-generator", endingNumber)
    })

    socket.on('ready-user', () => {
        readiedUsers.push(id)
        if (connectedUsers === readiedUsers) 
            socket.broadcast.emit("game-lobby")
        else
            socket.broadcast.emit("start-game")
    })
})

httpServer.listen(5000)