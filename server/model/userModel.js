import { model,Schema } from 'mongoose'

const userSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    friends: {
        type: Array,
        default: []
    },
    friendRequests: {
        type: Array,
        default: []
    },
    sentRequests: {
        type: Array,
        default: []
    },
    picturePath: {
        type: String,
        required: true
    }
})

export const UserModel = model("User",userSchema)