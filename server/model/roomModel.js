import mongoose, { Schema, model } from "mongoose";

const roomSchema = Schema({
    users: {
        type: Array,
    }
})

export const RoomModel = model("Room",roomSchema)