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
  
      
  return (
    <Link to={`book/${book.id}`} style={{ textDecoration: "none" }}>
     
        <Card
          component={Paper}
          elevation={6}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          title={book.title}
        >
          <CardMedia
            component="img"
            max-width="100%"
            image={book.coverImageURL}
          />
        </Card>
      
    </Link>
  );
}
