import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Register/Navbar";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import env from 'react-dotenv'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const password = useRef({});
  password.current = watch("password", "");

  const validateEmailFormat = (email) => {
    // Regular expression for email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePasswordFormat = (password) => {
    // Password format validation logic (e.g., minimum length, special characters, etc.)
    return password.length >= 8; // Example: minimum length of 8 characters
  };

  const onSubmit = async (data) => {
    const res = await fetch(`${env.API_URL}/v1/auth/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(
      (errors) => {
        console.log("errors");
      }
    )
    
    const d = await res.json()
    
        if (!res.ok) {
          return toast.error(d.error, {
            toastId: "error-1", // Unique ID for toast management
            draggable: true, // Allow user to drag the toast
          });
        }
    
        dispatch(
          userActions.login({
            user: d.user,
            token: d.token
          }))

        navigate("/")
  };

  const toSignup = () => {
    navigate("/register")
  }

  return (
    <>
    <Navbar />
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                {...register("email", { required: true, validate: validateEmailFormat })}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              {errors.email && errors.email.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.email && errors.email.type === "validate" && (
                <span>Invalid email format</span>
              )}
            </Grid>
            <Grid item xs={12}>
            <TextField
                  {...register("password", {
                    required: true,
                    validate: validatePasswordFormat,
                  })}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={handlePasswordVisibility}
                        variant="text"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </Button>
                    ),
                  }}
                />
              {errors.password && errors.password.type === "required" && (
                <span>This field is required</span>
              )}
              {errors.password && errors.password.type === "validate" && (
                <span>Invalid password format</span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled= {isSubmitting}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link variant="body2" onClick= {toSignup} sx={{
                              '&:hover': {
                                cursor: 'pointer'
                              }
              }}>
                New Here ? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    <ToastContainer />
    </>
  );
}
