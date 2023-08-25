import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { deleteBook, getMyBooks } from "../services/book";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function () {
  const {
    data: books,
    loading,
    error,
    refetch,
  } = useFetchData({
    fetcher: getMyBooks,
    initialData: [],
  });

  const [deleteId, setDeletedId] = useState("");
  const [open, setOpen] = React.useState(false);

  const isFullWidth = useMediaQuery((theme) => theme.breakpoints.only("xs"));
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeletedId("");
  };

  const showToastMessage = () => {
    toast.success("The book was deleted successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleDeleteBook = async (id) => {
    const response = await deleteBook(id).then(() => {
      refetch();
    });
    navigate("/manage");
    showToastMessage();
  };

  const handleRowClick = (params) => {
    const id = params.row.id;
    navigate(`/book/${id}`);
  };

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

  const rows = books.map((book) => ({
    id: book.id,
    coverImageURL: book.coverImageURL,
    title: book.title,
    author: book.author,
    description: book.description,
    owner: book.owner.firstName + " " + book.owner.lastName,
    createdAt: book.createdAt.substring(0, 10),
    updatedAt: book.updatedAt.substring(0, 10),
  }));

  console.log(books);

  const columns = [
    {
      field: "image",
      headerName: "Image",
      type: "img",
      width: 100,
      renderCell: (params) => {
        return (
          <img
            style={{ objectFit: "cover", width: "50px" }}
            src={params.row.coverImageURL}
          />
        );
      },
    },
    { field: "title", headerName: "Title", width: 150 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "owner", headerName: "Owner", width: 150 },
    { field: "createdAt", headerName: "CreatedAt", width: 150 },
    { field: "updatedAt", headerName: "UpdatedAt", width: 150 },

    {
      field: "actions",
      headerName: "Actions",
      type: "date",
      width: 150,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                navigate("edit/" + params.row.id);
              }}
              aria-label="edit"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                event.stopPropagation();
                handleClickOpen();
                setDeletedId(params.row.id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{""}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this book?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>NO</Button>
                <Button
                  onClick={() => {
                    handleClose();
                    handleDeleteBook(deleteId);
                  }}
                >
                  YES
                </Button>
              </DialogActions>
            </Dialog>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
            onClick={() => {
              navigate("/manage/add");
            }}
          >
            Add Book
          </Button>
        </Grid>
      </Grid>

      <Box paddingTop={3} style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} onRowClick={handleRowClick} />
      </Box>
    </Box>
  );
}
