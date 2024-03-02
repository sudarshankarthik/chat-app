import { Box, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import env from "react-dotenv";
import { useSelector } from "react-redux";
import User from "../Components/User";

const Friends = () => {
  const [searchValue, setSearchValue] = useState("");
  const token = useSelector((state) => state.user.token);
  const [searchUsers, setSearchUsers] = useState([]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const getUsers = async (searchParam) => {
      fetch(`${env.API_URL}/v1/user/search?searchParm=${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSearchUsers(data)
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    const timeoutId = setTimeout(() => getUsers(searchValue), 1000);
    return () => clearTimeout(timeoutId);
  }, [searchValue, token]);


  const results = Array.isArray(searchUsers)
    ? searchUsers.map((friend) => {
        return (
            <User  key={friend.userName} user={friend} />
        );
      })
    : null;

  return (
    <Box
      display="flex"
      margin="5px"
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"space-between"}
      height={"80vh"}
      p={"5px"}
    >
      <Box width={"100%"}>
        <TextField
          fullWidth
          variant="standard"
          label="Enter User Name to Search"
          onChange={handleSearch}
          
        />
      </Box>
      <Box
        flexGrow={"2"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"flex-start"}
        width={"100%"}
        gap={"0.5rem"}
        padding={"0.5rem"}
        pt={"1rem"}
        overflow={'auto'}
        sx={{  
          scrollbarWidth: "thin",
          scrollbarColor: "#888 transparent"
        }}
      >
        {searchUsers.length > 0 ? results : "add new friends to chat"}
      </Box>
    </Box>
  );
};

export default Friends;
