import {  Card, CardContent, CardMedia, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function BookCard({book}){
    return (
      <Link to={`book/${book.id}`}>
        <Card  component={Paper}
        elevation={6}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
        <CardMedia
          component="img"
          max-width="100%"
          image={book.coverImageURL}
          
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" textAlign="center">
            {book.title}
          </Typography>
          <Typography variant="body2" textAlign="center">
            {book.author}
          </Typography>
        </CardContent>
       
      </Card>
      </Link>
    )
}