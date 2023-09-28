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
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { useFetchData } from "../hooks/useFetchData";
import { getAllBooks, searchBook } from "../services/book";
import { SearchBar } from "../components/SearchBar";



export default function () {
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  

  const updateTitle = (title) => {
    setTitle(title);
  };


  

  useEffect(() => {
    const requesting = async () => {
        setLoading(true);
        searchBook(title).then((data) => {
            console.log("then")
            setBooks(data.results);
        })
            .catch((err) => {
              console.log("error")
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    requesting();

}, [title])
 

  if (loading) {
    return(
      <Box sx={{marginTop:6}}>
<CircularProgress />

      </Box>
       );
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
    <Box sx={{ marginTop:10}}>
     
    <SearchBar onSearch={updateTitle}/>
    </Box>
    
   
      
      <Box paddingY={3} marginY={5}>
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
