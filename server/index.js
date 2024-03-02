import express, { json } from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import verifyToken from './middlewares/verifyToken.js'
import chatRouter from './routes/chat.js'
import { Server, Socket } from 'socket.io'
import { verifySocket } from './middlewares/socketAuth.js'
import { joinRoom, sendMessage } from './controllers/socketChat.js'

config()

const app = express()
app.use(cors())
app.use(json())

// Routes
app.use("/v1/auth",authRouter)
app.use("/v1/user",verifyToken,userRouter)
app.use("/v1/chat",verifyToken,chatRouter)

const server = app.listen(process.env.PORT, () => {
    console.log("Listening on port:", process.env.PORT);
});

async function startServer() {
    try {
        // Connect to MongoDB
        await connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

startServer();
 
const io = new Server(server, {
    cors: true
});

io.use(verifySocket);

io.on('connect', socket => {
    console.log(`socket connected at ${socket.userName}`);

    socket.on('send-message',(m,r) => sendMessage(io,socket,m,r))
    socket.on('join-room',(r) => joinRoom(socket,r))

})    