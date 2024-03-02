import { Router } from "express";
import { getMessages, getRoom, sendMessage } from "../controllers/chat.js";

const chatRouter = Router()

chatRouter.get("/room",getRoom)
chatRouter.post("/message",sendMessage)
chatRouter.get("/message",getMessages)

export default chatRouter