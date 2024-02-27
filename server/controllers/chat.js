import { MessageModel } from "../model/chatModel.js"
import { RoomModel} from "../model/roomModel.js"
import { UserModel } from "../model/userModel.js"

export const getRoom = async (req,res) => {
    
    const { friend } = req.query

    const frienddata = await UserModel.findOne({userName: friend})
    const user = await UserModel.findById(req.verifiedUser);
    if (!frienddata) return res.status(401).json({"msg": "Friend not found"})

    if (!user.friends.includes(friend)) return res.status(401).json({"msg": "You are not friends with user"}) 

    const room = await RoomModel.findOne({users: [user.id,friend.id]})

    if (room) return res.status(200).json({id: room.id}) 

    const newroom = new RoomModel({
        users: [user.id,frienddata.id]
    })

    const savedroom = await newroom.save()

    return res.status(200).json({id: savedroom.id})
}

export const sendMessage = async (req,res) => {

    const { roomId,message } = req.body
    const user = await UserModel.findById(req.verifiedUser)

    const room = await RoomModel.findById(roomId)

    if (!room) return res.status(401).json({"msg": "Room dosn't exist"})

    if (!room.users.includes(user.id)) return res.status(401).json({"msg": "User is not part of the room"})

    const newMessage = new MessageModel({
        body: message,
        room: roomId,
        sender: user.userName
    })

    const savedmessage = await newMessage.save()

    return res.status(200).json(savedmessage)
}