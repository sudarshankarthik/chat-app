import express, { json } from 'express'
import cors from 'cors'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import verifyToken from './middlewares/verifyToken.js'

config()

const app = express()
app.use(cors())
app.use(json())

// Routes
app.use("/v1/auth",authRouter)
app.use("/v1/user",verifyToken,userRouter)

connect(process.env.MONGO_URL).then(() => {
    console.log('connected to mongodb');
    const server = app.listen(
        process.env.PORT,
        () => {
            console.log("listning to port: ",process.env.PORT);
        }
    )
}).catch((error) => console.log(error))
