import React, { useEffect, useRef } from "react";
import Navbar from "./Navbar";
import ChatApp from "./ChatApp";

import { useDispatch, useSelector } from "react-redux";
import env from "react-dotenv";
import { io } from "socket.io-client";
import { chatActions } from "../../store/chat-slice";

const Chat = () => {
  const message = useSelector((state) => state.chat.cntMessage);
  const token = useSelector((state) => state.user.token);
  const room = useSelector((state) => state.chat.room);
  const dispatch = useDispatch();
  const socket = useRef(null);

  useEffect(() => {
    if (token) {
      console.log("connecting to socket ...");
      socket.current = io(env.API_URL, { auth: { token: `Bearer ${token}` } });

      socket.current.on("connect", () => {
        console.log(`connected to server with id ${socket.id}`);
      });
      socket.current.on("connect_error", (e) => {
        console.log(`connected to server with id ${e}`);
      });

      socket.current.on("receive-message",(m) => {
        dispatch(chatActions.addMessage(m))
      })
    }
  }, [token]);

  useEffect(() => {
    if (socket.current && room) {
      socket.current.emit("join-room",room)
    }
  }, [room])

  useEffect(() => {
    if (socket.current && message !== "") {
      console.log("sending message");
      socket.current.emit("send-message", message, room);
      dispatch(chatActions.setMessage(""));
    }
  }, [message, room, dispatch]);

  return (
    <>
      <Navbar />
      <ChatApp />
    </>
  );
};

export default Chat;
