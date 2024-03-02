import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./actions";

const initialState = {
    isDarkMode: true,
    isLoggedIn: false,
    user: null,
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    extraReducers: (builder) => builder.addCase(revertAll, () => initialState),
    reducers: {
        setTheme: (state) => {
            state.isDarkMode = !state.isDarkMode
        },
        login: (state,action) => {
            state.isLoggedIn = true
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isLoggedIn = false
            state.friend = null
        },
        setUser: (state,action) => {
            state.user = action.payload
        }

    }
})

export const userActions = userSlice.actions

export default userSlice