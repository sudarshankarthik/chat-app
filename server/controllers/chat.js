import { MessageModel } from "../model/chatModel.js";
import { RoomModel } from "../model/roomModel.js";
import { UserModel } from "../model/userModel.js";
export const getRoom = async (req, res) => {
  try {
    
    const user = await UserModel.findById(req.verifiedUser)
    const friend = await UserModel.findOne({userName: req.query.friend})

    if (!friend) return res.status(402).json({"error": "Friend not found"})

    const users = [user.id, friend.id];

    const room = await RoomModel.findOne({ users: { $all: [user.id, friend.id] } });

    if (room) return res.status(200).json({"id": room.id})

    if(!user.friends.includes(friend.userName)) return res.status(402).json({"msg": "you are not friend with user"})

    const newRoom = new RoomModel({
      users: users
    })

    const savedRoom = await newRoom.save()
    
    if (savedRoom) return res.status(200).json({"id": savedRoom.id})

    return res.status(401).json({"error": "Unknown errror occured"})
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error})
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { roomId, message } = req.body;
    const user = await UserModel.findById(req.verifiedUser);

    const room = await RoomModel.findById(roomId);
    if (!room) return res.status(401).json({ msg: "Room dosn't exist" });

    if (!room.users.includes(user.id))
      return res.status(401).json({ msg: "User is not part of the room" });

    const newMessage = new MessageModel({
      body: message,
      room: roomId,
      sender: user.userName,
    });

    const savedMessage = await newMessage.save();

    return res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMessages = async (req,res) => {
  try {
    const room = await RoomModel.findById(req.query.room);

    if (!room) return res.status(401).json({ msg: "Room dosn't exist" });

    if (!room.users.includes(req.verifiedUser))
      return res.status(401).json({ error: "User is not part of the room" });
    const messages = await MessageModel.find({room: room.id})

    return res.status(200).json(messages)

  } catch (error) {
    console.log(error);
    return res.status(500).json({"error": "Internal server error"})
  }
}