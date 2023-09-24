import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useCallback, useEffect, useState } from "react";

const DEFAULT_SEARCH = "library-books";


function Image({search}) {

    const [src, setSrc] = useState(null);

    const updateImage = useCallback(async () => {
        const baseUrl = "https://source.unsplash.com/featured/640x480";
        const url = `${baseUrl}?${search}`;
        const response = await fetch(url);
        setSrc(response.url);
      }, [search]);
    
      useEffect(() => {
        updateImage();
      }, [updateImage]);
      return (
      <Box sx={{marginTop:8}}>
<img src={src} onClick={updateImage} alt="" />
      </Box>
      );
    }

    export default function (){
        const [search, setSearch] = useState(DEFAULT_SEARCH);
        

    return(
        <Grid container >
            <Grid intem sm={8} lg={8} xs={12}>
            <Fragment>
      <Image search={search} />
      
    </Fragment>
            </Grid>
       
 <Grid item sm={4} lg={4} xs={12}>
            <Typography variant="h3" marginTop={16}>About goodReads</Typography>
        
        <Box sx={{marginTop: 8}}>
           <Typography variant="h6" marginBottom={4}>A few things you can do on goodReads: </Typography> 
           
           <Typography variant="body2"> Create an account where you can manage your books: add/ edit/ delete a book  </Typography>
           <Typography variant="body2"> Share your books with other users  </Typography>
           <Typography variant="body2"> Search a book by title</Typography>
        </Box>
       
        </Grid>
        </Grid>
        
       


    )
}