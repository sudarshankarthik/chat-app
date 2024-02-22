import { Router } from "express"
import { addFriend, searchUsers, getFriends, requestFriend } from "../controllers/user.js"

const userRouter = Router()

userRouter.get("/search",searchUsers)
userRouter.get("/friend",getFriends)
userRouter.patch("/friend/request",requestFriend)
userRouter.patch("/friend/add",addFriend)

export default userRouter