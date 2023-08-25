import { Box, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function(){
    return(
        <Box minHeight={"100vh"}>
            <Typography>404</Typography>
            <Button variant="contained" size="large" component={NavLink}
                to={"/"} pad={5}>GO TO HOMEPAGE</Button>
        </Box>
    )

}