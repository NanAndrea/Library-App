import {
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { getBookById } from "../services/book";

export function Book() {
  const { id } = useParams();

  const {
    data: book,
    loading,
    error,
  } = useFetchData({
    fetcher: () => getBookById(id),
  });

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Box>
        <Typography>Something went wrong with your request...</Typography>
      </Box>
    );
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs sm={4}>
          <Box
            component="img"
            sx={{ width: "100%", height: "100%" }}
            src={book.coverImageURL}
          ></Box>
        </Grid>
        <Grid item xs={12} sm={8} container>
          <Grid item container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3" component="div">
                {book.title}
              </Typography>
              <Grid item>
                <Typography variant="subtitle1" paddingY={3}>
                  by {book.author}
                </Typography>
              </Grid>
              <Divider variant="fullWidth" />

              <Typography variant="subtitle1" paddingY={3}>
                Owned by {book.owner.firstName} {book.owner.lastName}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider variant="fullWidth" />
          <Typography variant="h2" paddingY={3}>
            Description
          </Typography>
          <Typography variant="body2" gutterBottom>
            {book.description}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
