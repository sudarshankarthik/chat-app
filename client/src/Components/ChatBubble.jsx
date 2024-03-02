import {Chip, Container } from "@mui/material";
import React from "react";

const ChatBubble = ({ message, self = true }) => {

  return (
    <Container sx={{
      margin: "5px",
      display: "flex",
      justifyContent: self ? "flex-end" : "flex-start"
    }}
    >
      <Chip
        sx={{
          height: "auto",
          "& .MuiChip-label": {
            display: "block",
            whiteSpace: "normal",
            fontSize: "1rem"
          },
        }}
        color={self ? "success" : "primary"}
        label={message}
      />
    </Container>
  );
};

export default ChatBubble;
