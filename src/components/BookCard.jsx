import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export function BookCard({ book }) {
  const [showFullText, setShowFullText] = useState(false);

  function handleShowFullText (e){
    setShowFullText(!showFullText);
    e.stopPropagation();
  };

 {/* const text = (
    <Box>
      <Typography variant="body1" fontWeight="bold">
        {book.title}
      </Typography>

      <Typography variant="body2" paddingTop="5px">
        by {book.author}
      </Typography>
      <Typography
        variant="body2"
        paddingTop="10px"
        color="GrayText"
        sx={{
          height: "30rem",
          lineHeight: "1rem",
          overflow: "hidden",
         
          
        }}
      >
        {showFullText ? book.description : `${book.description.slice(0, 200)}...`}
        <Typography component="button" variant="text" disableElevation sx={{border:"none", color:"red"}} onClick={handleShowFullText}>{showFullText ? "(less)" : "...more"}</Typography>
      </Typography>
      
    </Box>
      );*/}
  return (
    <Link to={`book/${book.id}`} style={{ textDecoration: "none" }}>
      <Tooltip
        //title={text}
        placement="bottom"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              bgcolor: "white",
              color: "black",
              border: "2px solid #B9AD99",
              padding: "15px 10px",

             maxWidth: "300px",
              maxHeight: "200px",
              '@media(max-width:600px)':{
               display:"none"}
            },
          },
          arrow: {
            color: "primary.dark",
          },
        }}
      >
        <Card
          component={Paper}
          elevation={6}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            max-width="100%"
            image={book.coverImageURL}
          />
        </Card>
      </Tooltip>
    </Link>
  );
}
