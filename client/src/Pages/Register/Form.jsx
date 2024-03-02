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
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import env from "react-dotenv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for styling
import { userActions } from "../../store/user-slice";
import { useDispatch } from "react-redux";
import Dropzone from 'react-dropzone'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const password = useRef({});
  password.current = watch("password", "");

  const validateEmailFormat = (email) => {
    // Regular expression for email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const [showPassword, setShowPassword] = useState(false);

  const validatePasswordFormat = (password) => {
    // Password format validation logic (e.g., minimum length, special characters, etc.)
    return password.length >= 8; // Example: minimum length of 8 characters
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateConfirmPassword = (value) => {
    return value === password.current || "The passwords do not match";
  };

  const formData = new FormData();
  const [fileImage, setFileImage] = useState(null)

  const onSubmit = async (data) => {

    for (const key in data) {
      formData.append(key, data[key]);
    }
    formData.append('profilePic', fileImage);

    const res = await fetch(`${env.API_URL}/v1/auth/register`, {
      method: "POST",
      body: formData,
    });

    const d = await res.json();
    if (!res.ok) {
      return toast.error(d.error, {
        toastId: "error-2", // Unique ID for toast management
        draggable: true, // Allow user to drag the toast
      });
    }

    console.log(d);
    dispatch(
      userActions.login({
        user: d.user,
        token: d.token,
      })
    );

    navigate("/");
  };

  const toSigin = () => {
    navigate("/login");
  };

  return (
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName", { required: true })}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
              {errors.firstName && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("lastName", { required: true })}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
              {errors.lastname && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("userName", { required: true })}
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
              />
              {errors.userName && <span>This field is required</span>}
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("email", {
                  required: true,
                  validate: validateEmailFormat,
                })}
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
            <Grid item xs={12}  >
              <Box>

            <Dropzone
                    accept={{
                      "image": [".png",".jpeg",".jpg"]
                    }}
                    multiple={false}
                    onDrop={(file) => setFileImage(file[0])}
                  >
                    {({getRootProps, getInputProps}) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed`}
                        p='1rem'
                        sx={{
                          "&:hover": {
                            cursor: "pointer"
                          }
                        }}
                      >
                        <input {...getInputProps()} />
                        {!fileImage ? (
                          <Typography>{"Add Picture Hear"}</Typography>
                        ) : (
                            <Box sx={{display: "flex",justifyContent: "space-between"}}>
                              <Typography>{fileImage.name}</Typography>
                              <EditOutlinedIcon />
                            </Box>

                          )
                        }
                      </Box>
                    )}
                  </Dropzone>
              </Box>
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
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
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
            <Grid item xs={12}>
              <TextField
                {...register("confirmPassword", {
                  required: true,
                  validate: validateConfirmPassword,
                })}
                required
                fullWidth
                name="confirmPassword"
                label="Conform Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={handlePasswordVisibility}
                      variant="text"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  ),
                }}
              />
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span>This field is required</span>
                )}
              {errors.confirmPassword && errors.confirmPassword.message && (
                <span>{errors.confirmPassword.message}</span>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                variant="body2"
                onClick={toSigin}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
}
