import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAuthContext } from "../context/auth/AuthContext";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { useFetchData } from "../hooks/useFetchData";
import { getAllBooks } from "../services/book";

export default function () {
  const { user } = useAuthContext();
  const {
    data: books,
    loading,
    error,
  } = useFetchData({
    fetcher: getAllBooks,
    initialData: [],
  });

  console.log(books);

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
    <Box sx={{ display: {  md: "none" },}}>
      <TextField
        id="search"
        type="search"
       placeholder ="Search books"
       size="small"
        
        
        InputProps={{
          
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      </Box>
      <Box paddingY={3}>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book._id}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
}
