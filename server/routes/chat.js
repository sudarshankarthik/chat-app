import { Router } from "express";
import { getRoom, sendMessage } from "../controllers/chat.js";

const chatRouter = Router()

chatRouter.get("/room",getRoom)
chatRouter.post("/",sendMessage)

export default chatRouter