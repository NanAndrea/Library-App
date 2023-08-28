import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { getBookById, updateBook } from "../services/book";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
import { PhotoCamera } from "@mui/icons-material";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const EditBookSchema = z.object({
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
  const { id } = useParams();
  const {
    data: book,
    loading: bookLoading,
    error,
  } = useFetchData(
    {
      fetcher: () => getBookById(id),
    },
    [id]
  );

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      author: "",
      description: "",
      file: null,
    },
    resolver: zodResolver(EditBookSchema),
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        description: book.description,
        file: book.coverImageURL,
      });
    }
  }, [book]);

  function displayErrors(key) {
    const error = errors[key];
    return {
      error: Boolean(error),
      helperText: error && error.message,
    };
  }

  function renderImageURL(selectedImage) {
    if (typeof selectedImage === "string") {
      return selectedImage;
    }
    return URL.createObjectURL(selectedImage);
  }

  function onSubmit(dataBook) {
    setLoading(true);
    setServerError("");
    updateBook(dataBook, id)
      .then((book) => {
        navigate("/manage");
       toast.success("Book successfully updated!")
      })
      .catch((err) => {
        setServerError(err.data.message);
       
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (bookLoading) {
    return <CircularProgress />;
  }

  if (serverError) {
      navigate("/404")
    
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Typography variant="h3">Edit Book</Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Grid container paddingY={4} spacing={4} display="flex">
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="title"
              label="Title"
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
              required
              {...register("description")}
              {...displayErrors("description")}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="file"
              render={({
                field: { onChange, value: selectedImage },
                fieldState: { error },
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
                    },
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      {selectedImage && (
                        <img
                          style={{ width: 120, height: 180 }}
                          src={renderImageURL(selectedImage)}
                          alt="photo not available now"
                        />
                      )}
                      {serverError && (
                        <Alert sx={{ my: 2 }} severity="error">
                          
                          {serverError}
                        </Alert>
                      )}
                      <Box>
                        {selectedImage !== book.coverImageURL ? (
                          <Button
                            sx={{my:2}}
                            variant="contained"
                            onClick={() => {
                              onChange(book.coverImageURL);
                            }}
                          >
                            Discard the changes
                          </Button>
                        ) : (
                          <Button
                            disabled={loading}
                           sx={{my:2}}
                            variant="contained"
                            color="primary"
                            component="label"
                          >
                            <PhotoCamera sx={{ paddingRight: "0.5rem" }}/>
                            Edit Cover Image
                            <input
                              accept="image/*"
                              type="file"
                              hidden
                              onChange={(e) => {
                                if (
                                  e.target.files &&
                                  e.target.files.length > 0
                                ) {
                                  onChange(e.target.files[0]);
                                }
                              }}
                            />
                          </Button>
                        )}
                      </Box>
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
          SAVE CHANGES
        </Button>
      </Box>
    </Box>
  );
}
