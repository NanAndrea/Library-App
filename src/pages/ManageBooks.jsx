import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";



export default function ManageBooks(){
    const isFullWidth = useMediaQuery((theme) => theme.breakpoints.only("xs"));
    return(
        <Box>
            <Grid container spacing={3} display="flex"  alignItems="center" >
                <Grid item xs={12} sm={8} md={10} >
                <Typography variant="h3">Manage Books</Typography>
                </Grid>
            <Grid item xs={12} sm={4} md={2}>
<Button variant="contained"  fullWidth={isFullWidth} disableElevation  sx={{backgroundColor:'primary.dark'}} >
Add Book
</Button>
            </Grid>
            </Grid>
           
            
            
        </Box>
    )
}