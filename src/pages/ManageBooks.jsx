import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const rows = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
];

const columns = [
  { field: "image", headerName: "Image", width: 100 },
  { field: "title", headerName: "Title", width: 150 },
  { field: "author", headerName: "Author", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "owner", headerName: "Owner", width: 150 },
  { field: "created At", headerName: "Created At", width: 150 },
  { field: "updated At", headerName: "Updated At", width: 150 },
  { field: "actions", headerName: "Actions", width: 100 },
];



export default function ManageBooks() {
  const isFullWidth = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const navigate = useNavigate();

  return (
    <Box>
      <Grid container spacing={3} display="flex" alignItems="center">
        <Grid item xs={12} sm={8} md={10}>
          <Typography variant="h3">Manage Books</Typography>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
          <Button
            variant="contained"
            fullWidth={isFullWidth}
            disableElevation
            sx={{ backgroundColor: "primary.dark" }}
            onClick={()=>{
              navigate("/manage/add");
            }}
          >
            Add Book
          </Button>
        </Grid>
      </Grid>

      <Box paddingTop={3} style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
}
