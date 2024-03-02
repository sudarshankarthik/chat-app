import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../store/chat-slice";

const User = ({ user, message = "say Hi " }) => {

  

  const dispatch = useDispatch();
  const handleFriendClick = () => {
    dispatch(chatActions.selectChat(user));
  };
  const friend = useSelector((state) => state.user.friend)


  return (
    <Paper
      sx={{ width: "100%", cursor: "pointer" }}
      elevation={ friend === user ? 6 : 3  }
      onClick={() => handleFriendClick()}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"1rem"}
        padding={"0.5rem"}
        alignItems={"center"}
      >
        <Box display={"flex"}>
          <Avatar src={user.picturePath} alt="friend profile pic" />
        </Box>
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant={"h5"}>{user.userName}</Typography>
          <Typography sx={{ fontSize: "0.9rem" }}>{message}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default User;
