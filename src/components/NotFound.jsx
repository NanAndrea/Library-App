import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import Image from "../img/page-not-found.jpg";

export default function(){
    return(
        <Box minHeight={"100vh"} sx={{display:"flex", justifyContent:"flex-start", alignItems:"flex-end", backgroundImage: `url(${Image})`, backgroundPosition: "center",backgroundRepeat: 'no-repeat', 
        backgroundSize: "cover"}} >
            <Box sx={{}}>
            <Button variant="text" size="large" component={NavLink} sx={{ color:"#B65866"}}
                to={"/"} pad={5}>GO TO HOMEPAGE</Button>
            </Box>
            
        </Box>
    )

}