import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import Image from "../img/backgroundImage.jpg";
import { useState } from "react";
import {getMyBooks } from "../services/book";
import { useAuthContext } from "../context/auth/AuthContext";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { register as registerService } from "../services/auth";

const UserRegisterSchema = z.object({
  email: z.string().min(3, "Email is required").email("Invalid email"),
  password: z.string().min(2, "Password is required"),
});

export default function () {
  const navigate = useNavigate();

  const { user, login } = useAuthContext();

  const {
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(UserRegisterSchema),
  });

  const [serverError, setServerError] = useState("");

  function displayError(key) {
    const error = errors[key];
    return {
      error: Boolean(error),
      helperText: error && error.message,
    };
  }

  function onSubmit(data) {
    setServerError("");
    registerService(data)
      .then((user) => {
        navigate("/");
      })
      .catch((error) => {
        setServerError(error.data.message);
      });

    login(data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setServerError(error);
      });
  }

  return (
    <Box>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
           
            <Typography variant="body1">
              or{" "}
              <Link component={NavLink} to="/" color="primary.main">
                {" explore the app"}
              </Link>
            </Typography>
            <Box component="form" sx={{ mt: 1 }} onSubmit={onSubmit} >
              <TextField
              
                {...register("email")}
                {...displayError("email")}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoFocus
                style={{color:"brown"}}
                
                
              />
              <TextField
                {...register("password")}
                {...displayError("password")}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />

              {serverError && <Alert severity="error">{serverError}</Alert>}

              <Button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor:"primary.dark" }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link component={NavLink} to="/register" variant="body1" color="primary.main">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
