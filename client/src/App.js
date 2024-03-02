import React from 'react'
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux'


const App = () => {

  const isDarkMode = useSelector((state) => state.user.isDarkMode)

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);


  const theme = isDarkMode ? 'dark' : 'light'
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
            path="/"
            element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
          />
        <Route
            path="*"
            element={isLoggedIn ? <Chat /> : <Navigate to="/login" />}
          />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  )
}

export default App