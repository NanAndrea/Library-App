import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export default function (){
return (
    <Box>
        <Header />
        <Container maxWidth="xl" sx={{backgroundColor:"secondary.main"}}>
        <Container maxWidth="lg" sx={{flexGrow:1, py:4}}>
            <Outlet />
        </Container>
        </Container>
        
    </Box>
)
}