import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { addBook } from "../services/book";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const AddBookSchema = z.object({
  title: z.string().min(3, "Title is required"),
  author: z.string().min(3, "Author is required"),
  description: z.string().min(3, "Description is required"),
  file: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .png and .webp formats are supported."
    )
    .refine((file) => file !== null, "Image is required"),
});

export default function () {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      file: null,
    },
    resolver: zodResolver(AddBookSchema),
  });

  function displayErrors(key) {
    const error = errors[key];
    return {
      error: Boolean(error),
      helperText: error && error.message,
    };
  }

  function onSubmit(data) {
    
    setLoading(true);
    setServerError("");
    addBook(data)
      .then((book) => {
        navigate("/manage");
        toast.success("Book successfully added");
      })
      .catch((err) => {
        setServerError(err.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  if (serverError) {
    navigate("/404")
  }

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ minHeight: "100vh" }} marginTop={8}>
      <Typography variant="h3">Add book</Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container paddingY={4} spacing={4} display="flex">
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="title"
              label="Title"
              name="Title"
              type="text"
              required
              {...register("title")}
              {...displayErrors("title")}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              id="author"
              label="Author"
              name="Author"
              type="text"
              required
              {...register("author")}
              {...displayErrors("author")}
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              id="description"
              label="Description"
              name="Description"
              required
              {...register("description")}
              {...displayErrors("description")}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            
          >
            <Controller
              control={control}
              name="file"
              render={({
                field: { onChange, value: selectedImage },
                fieldState: { error }
              }) => (
                <Grid
            item
            md={10}
            xs={12}
            sx={{
              "@media (max-width: 900px)": {
                height: "20rem !important",
              },
              "@media (min-width: 901px)": {
                height: "20rem !important",
                
              }
            }}
          >
                <Box
                  sx={{
                    border: "3px dotted #B9AD99",
                    width: "100%",
                    height: "100%",

                    borderRadius: "1rem",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                   <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", textAlign: "center", marginTop: "10px"}} >
                  {!selectedImage && (
                   <Button  variant="contained" color="primary" component="label" >
                      <PhotoCameraIcon sx={{ paddingRight: "0.5rem" }} />
                      UPLOAD COVER IMAGE
                      <input
                        accept="image/*"
                        type="file"
                        hidden
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            onChange(e.target.files[0]);
                          }
                        }}
                      />
                    </Button>
                  )}
                
              
            
            {error && <Box sx={{py: 2}}>{error.message}</Box>}

            {selectedImage && (

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  style={{ width: 120, height: 180 }}
                  src={URL.createObjectURL(selectedImage)}
                  alt="photo"
                />
                <Button
                  variant="contained"
                  sx={{my: 2}}
                  onClick={() => {
                    onChange(null)
                  }}
                >
                  Remove This Image
                </Button>
                {serverError && (
                  <Alert sx={{ my: 2 }} severity="error">
                    {serverError}
                  </Alert>
                )}
              </Box>
            )}
           </Box>
           </Box>
          </Grid>
              )}
              />
        </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "primary.dark" }}
          
        >
          ADD BOOK
        </Button>
      </Box>
    </Box>
  );
}
