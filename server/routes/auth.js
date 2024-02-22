import {Router} from "express"
import {createUser,authUser} from '../controllers/auth.js'
import upload from "../middlewares/multer.js"
import { uploadToCloudinary } from "../middlewares/cloudinary.js"

const authRouter = Router()

authRouter.post("/register", upload.single("profilePic"), uploadToCloudinary, createUser)
authRouter.post("/login",authUser)

export default authRouter  