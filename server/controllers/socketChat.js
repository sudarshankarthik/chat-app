import { MessageModel } from "../model/chatModel.js";
import { RoomModel } from "../model/roomModel.js";
import { UserModel } from "../model/userModel.js";

export const sendMessage =  async (io,socket,message,r) => {
    try {
        const room = await RoomModel.findById(r);
        if (!room) socket.emit('message-error',"room dosn't exist")
        if (!room.users.includes(socket.userName)) socket.emit('message-error',"user dosn't exist to room")
        const user = await UserModel.findById(socket.userName);
        const newMessage = new MessageModel({
            body: message,
            room: room.id,
            sender: user.userName,
          });
    
        const savedMessage = await newMessage.save();
        io.to(room.id).emit('receive-message',savedMessage)
    } catch (error) {
        console.log(error);
    }
}

export const joinRoom = async (socket,r) => {
    try {
        const room = await RoomModel.findById(r)
        if(!room.users.includes(socket.userName)) socket.emit('message-error',"user dosn't belong to room")
    
        socket.join(room.id)
    } catch (error) {
        console.log(error);
    }
}