import { Box, Button } from "@mui/material";
import React from "react";
import env from "react-dotenv";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { chatActions } from "../store/chat-slice";

const StartChat = () => {
  const friend = useSelector((state) => state.chat.chatWith);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  
  const requestMessages = async (room) => {
    const res = await fetch(
        `${env.API_URL}/v1/chat/message?room=${room}`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
    ).catch(
      (error) => console.log(error)
    )
    
    const data = await res.json()
  
    if (!res.ok) return console.log(data.error)
  
    dispatch(chatActions.setMessages(data))
  }

  const handleConnect = async () => {
    const res = await fetch(
      `${env.API_URL}/v1/chat/room?friend=${friend.userName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    ).catch((errors) => {
      console.log(errors);
    });

    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.msg, {
        toastId: "error-4",
        draggable: true,
      });
    }
    dispatch(chatActions.setRoom(data.id));
    requestMessages(data.id)
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"20vh"}
      >
        <Button size="large" variant="outlined" onClick={handleConnect}>
          {" "}
          Connect{" "}
        </Button>
      </Box>
      <ToastContainer />
    </>
  );
};

export default StartChat;
