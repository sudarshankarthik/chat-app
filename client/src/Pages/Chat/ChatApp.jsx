import { Box, Container, Paper, useMediaQuery } from "@mui/material";
import React from "react";
import Friends from "../../Widgets/Friends";
import Chat from "../../Widgets/Chat";
import ChatInput from "../../Components/ChatInput";
import StartChat from "../../Widgets/StartChat";
import { useSelector } from "react-redux";

const ChatApp = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const room = useSelector((state) => state.chat.room);
  const chatWith = useSelector((state) => state.chat.chatWith);
  const friend = useSelector((state) => state.chat.chatWith);

  return (
    <>
      {isMobile ? (
        <Container>
          {friend ? (
            <Box height="90vh" position={"relative"}>
                <Box position={"absolute"} bottom={0} zIndex={3} width={"100%"}>
                  <Paper>
                    {room ? <ChatInput /> : chatWith && <StartChat />}
                  </Paper>
                </Box>
                <Chat />
            </Box>
          ) : (
            <Friends />
          )}
        </Container>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          width="100%"
          height={"90vh"}
        >
          <Box flexBasis="30%" height="80vh">
            <Paper>
              <Friends />
            </Paper>
          </Box>
          <Box flexBasis={"65%"} height="80vh" position={"relative"}>
            <Paper sx={{ height: "100%" }}>
              <Box position={"absolute"} bottom={0} zIndex={3} width={"100%"}>
                <Paper>
                  {room ? <ChatInput /> : chatWith && <StartChat />}
                </Paper>
              </Box>
              <Chat />
            </Paper>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChatApp;
