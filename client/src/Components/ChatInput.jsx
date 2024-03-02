import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { chatActions } from '../store/chat-slice';

const ChatInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("")

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
        dispatch(chatActions.setMessage(message));
        setMessage('')
    }
  };

  return (
    <>   
        <TextField
          fullWidth
          label="Enter your message here"
          variant="filled"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyUp={handleKeyPress}
        />
    </>
  );
};

export default ChatInput;
