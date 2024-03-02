import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import env from "react-dotenv";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import ChatBubble from "../Components/ChatBubble";
import CloseIcon from '@mui/icons-material/Close';
import { chatActions } from "../store/chat-slice";

const Chat = () => {
  const friend = useSelector((state) => state.chat.chatWith);
  const user = useSelector((state) => state.user.user);
  const [button, setButton] = useState(4);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const containerRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const MessageRender = messages.map((message) => {
    return (
      <ChatBubble
        message={message.body}
        self={message.sender === user.userName}
        key={message.id}
      />
    );
  });

  useEffect(() => {
    if (friend && user) {
      if (user.friends.includes(friend.userName)) {
        setButton(4);
      } else if (user.friendRequests.includes(friend.userName)) {
        setButton(3);
      } else if (user.sentRequests.includes(friend.userName)) {
        setButton(2);
      } else {
        setButton(1);
      }
    }
  }, [friend, user]);

  if (friend === null)
    return (
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        flexDirection={"column"}
        gap={"1rem"}
      >
        <Typography variant="h4"> Select a user to Chat </Typography>
        <Typography variant="h6"> Search for new users </Typography>
      </Box>
    );
  const buttons = {
    1: "Send Request",
    2: "Cancel Request",
    3: "Confirm Friend",
    4: "Remove Friend",
  };

  const body = {
    friendName: friend.userName,
  };

  const handleclick = async () => {
    let requestURL;
    if (button === 1 || button === 2) {
      requestURL = `${env.API_URL}/v1/user/friend/request`;
    } else if (button === 3 || button === 4) {
      requestURL = `${env.API_URL}/v1/user/friend/add`;
    }

    const res = await fetch(requestURL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res || !res.ok) {
      console.error("error fetching request");
      return;
    }
    const data = await res.json();
    dispatch(userActions.setUser(data));
  };

  const handleCloseFriend = () => {
    dispatch(chatActions.selectChat(null))
  }

  return (
    <Box
      pt={"3rem"}
      position={"relative"}
      height={"100%"}
      overflow={"auto"}
      sx={{
        overflowX: "hidden",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 transparent",
      }}
      ref={containerRef}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"1rem"}
      >
        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'} flexDirection={'row'} width={'100%'} >
          <IconButton color="danger" onClick={handleCloseFriend} >
            <CloseIcon />
          </IconButton>
        </Box>
        <img
          src={friend.picturePath}
          alt="user profile pic"
          style={{ borderRadius: "50%" }}
        />
        <Typography variant="h6">
          {`${friend.firstName} ${friend.lastName}`}
        </Typography>
        <Button
          onClick={() => handleclick()}
          variant="contained"
          color={button % 2 !== 0 ? "primary" : "error"}
        >
          {" "}
          {buttons[button]}{" "}
        </Button>
      </Box>
      <Box
        width={"100%"}
        margin={"60px 10px"}
        display={"flex"}
        flexDirection={"column"}
      >
        {MessageRender}
      </Box>
    </Box>
  );
};

export default Chat;
