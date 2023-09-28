import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export function SearchBar({onSearch}) {
    const [title, updateTitle] = useState("");
    

    const handleUpdateTitle = async () => {
        onSearch(title)
    };

    return (
        <Box sx={{display:{md:"flex", justifyContent:"flex-end"}}}>

        <TextField
        
          id="search"
          
          type="search"
         placeholder ="Search books"
         size="small"
         value={title}
         onChange={ event => updateTitle(event.target.value)}
          
          InputProps={{
            
            endAdornment: (
              <InputAdornment position="end">
                <IconButton >
                <SearchIcon  onClick={
                    handleUpdateTitle
                }/>
                </IconButton>
                
              </InputAdornment>
            ),
          }}
        />
        </Box>
    )
}