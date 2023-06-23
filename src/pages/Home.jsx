import { Box, Typography, Button, Grid, CircularProgress, Card, CardMedia, CardContent, CardActions} from "@mui/material";
import { useAuthContext } from "../context/auth/AuthContext";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { BookCard } from "../components/BookCard";
import { useFetchData } from "../hooks/useFetchData";
import { getAllBooks } from "../services/book";

export default function(){
    const {
        data: books,
        loading,
        error,
    } = useFetchData({
        fetcher: getAllBooks,
        initialData: [],
    });

    console.log(books);

if(loading){
    return <CircularProgress />;

}
if(error){
    return(
        <Box>
            <Typography>Something went wrong with your request...</Typography>
        </Box>
    );
}


   
    return(
        <Box>
           
                 <Grid container spacing={4}>
                
                {books.map((book)=> (
                  <Grid item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={book._id}>
                    <BookCard book={book}/>

                  </Grid>
                )
                )}
           </Grid>
             
          
          
           
        </Box>

        
    )
}