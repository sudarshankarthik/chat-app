import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./actions";

const initialState = {
    chatWith: null,
    cntMessage: "",
    messages: [],
    room: null,
}

const chatSlice = createSlice({
    name: "chat-slice",
    initialState: initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        selectChat: (state,action) => {
            state.chatWith = action.payload
            state.room = null
            state.messages = []
        },
        setMessage: (state,action) => {
            state.cntMessage = action.payload
        },
        setRoom: (state,action) => {
            state.room = action.payload
        },
        setMessages: (state,action) => {
            state.messages = action.payload
        },
        addMessage: (state,action) => {
            state.messages.push(action.payload)
        }
    }
})

export const chatActions = chatSlice.actions

export default chatSlice