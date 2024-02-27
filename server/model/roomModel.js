import mongoose, { Schema, model } from "mongoose";

const roomSchema = Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
})

export const RoomModel = model("Room",roomSchema)