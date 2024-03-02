import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import { revertAll } from "../../store/actions";

const Navbar = () => {
  const navigate = useNavigate();
  const isDarkMode = useSelector((state) => state.user.isDarkMode);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [anchorProfile, setAnchorProfile] = useState(null);

  const changeMode = () => {
    dispatch(userActions.setTheme());
  };

  const toHome = () => {
    navigate("/");
  };

  const toProfile = () => {
    navigate("/")
  }

  const logout = () => {
    dispatch(revertAll())
  }

  const handleOpenProfile = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleCloseProfile = (event) => {
    setAnchorProfile(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={toHome}
          >
            LINKS
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-evenly"}
            alignItems={"center"}
            gap={"1rem"}
          >
            <Box>
              <IconButton onClick={() => changeMode()}>
                {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={handleOpenProfile}>
                <img
                  src={`${user.picturePath}`}
                  alt="prifile pic"
                  height="50"
                  width="50"
                  style={{ borderRadius: "50%" }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorProfile}
                keepMounted
                open={Boolean(anchorProfile)}
                onClose={handleCloseProfile}
                sx={{
                  padding: "5px",
                  mt: "50px",
                }}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={toProfile}>Profile</MenuItem>
                <MenuItem onClick={logout} >Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
