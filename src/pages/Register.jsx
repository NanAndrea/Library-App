import { Avatar, Box, Button, Container, Grid, TextField, Typography,Link, Alert } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {register as registerService} from "../services/auth"
import {z} from "zod";
import { useState } from "react";

const UserRegisterSchema = z.object({
        firstName: z.string({}).min(3, "Fist Name is required"),
        lastName: z.string().min(3, "Last Name is required"),
        email: z.string().min(3,"Email is required").email("Invalid email"),
        password: z.string().min(2, "Password is required"),
        confirmPassword: z.string().min(2, "Confirm Password is required"),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ["confirmPassword"],
    });
  }
});


export default function (){
  const [serverError,setServerError]= useState("");
  const navigate = useNavigate();

    const {getValues, register, handleSubmit, formState: {errors}}= useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        email:"",
        password:"",
        confirmPassword:""
      },
      resolver: zodResolver(UserRegisterSchema),
    });

    

    function onSubmit(data){
      setServerError("");
        registerService(data).then((user)=>{
         
          navigate("/login");
        }).catch((error)=>{
          
          setServerError(error.data.message);
        });
        
    }

    function displayError(key){
      const error = errors[key];
      return {
        error: Boolean(error),
        helperText: error && error.message
      };
    }
    
    return(
        <Box>
             <Container maxWidth="xs">
       
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.dark' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                {...register("firstName")}
                {...displayError("firstName")}
                 
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoComplete="given-name"
                  name="firstName"
                  
                  
                 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                {...register("lastName")}
                {...displayError("lastName")}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("email")}
                {...displayError("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("password")}
                {...displayError("password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                {...register("confirmPassword")}
                {...displayError("confirmPassword")}
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            {serverError && (
                <Alert sx={{my:2}} severity="error">{serverError}</Alert>
              )}
            <Button
            onClick={handleSubmit(onSubmit)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'primary.dark'}}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link to="/login" component={NavLink} variant="body2" color="primary.main" paddingY={2}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
        </Box>
    )
}