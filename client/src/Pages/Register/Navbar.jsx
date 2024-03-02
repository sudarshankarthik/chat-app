import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/user-slice';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate()

  const toHome = () => {
    navigate("/")
  }

  const isDarkMode = useSelector((state) => state.user.isDarkMode)

  const dispatch = useDispatch()

  const changeMode = () => {
    dispatch(userActions.setTheme())
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={toHome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                cursor: 'pointer'
              }            
            }}
          >
            Links
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={toHome}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          >
            Links
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>
          <Box>
            <IconButton onClick={() => changeMode()}>
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon/>}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;