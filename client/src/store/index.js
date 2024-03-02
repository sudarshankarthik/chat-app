
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,    
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./user-slice";
import chatSlice from "./chat-slice";


const store = configureStore({
  reducer: persistReducer({
    key: 'root',
    storage,
    version: 1
  },
  combineReducers({
    user: userSlice.reducer,
    chat: chatSlice.reducer
  })
    ),
    
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  })
  
  export default store