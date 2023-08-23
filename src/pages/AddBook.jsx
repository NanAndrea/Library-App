import {
  Box,
  Button,
  
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";


export default function AddBook() {
  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Typography variant="h3">Add book</Typography>

      <Box component="form" noValidate>
        <Grid container paddingY={4} spacing={4} display="flex">
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              id="title"
              label="Title"
              name="Title"
              type="text"
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              id="author"
              label="Author"
              name="Author"
              type="text"
              sx={{ marginBottom: "1rem" }}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              id="description"
              label="Description"
              name="Description"
            />
          </Grid>
          <Grid item md={6} xs={12} 
                sx={{  '@media (max-width: 900px)': {
                  height: "20rem !important",
              }}} >
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
              <Button
                size="small"
                component="label"
                variant="contained"
                sx={{ backgroundColor: "primary.dark" }}
              >
                {" "}
                <PhotoCameraIcon sx={{ paddingRight: "0.5rem" }} />
                UPLOAD COVER IMAGE
                <TextField type="file" style={{ display: "none" }} />
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          sx={{ backgroundColor: "primary.dark" }}
          onClick={onSubmit}
        >
          ADD BOOK
        </Button>
      </Box>
    </Box>
  );
}
