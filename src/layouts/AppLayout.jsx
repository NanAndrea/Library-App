import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export default function (){
return (
    <Box>
        <Header />
        <Container maxWidth="lg" sx={{flexGrow:1}}>
            <Outlet />
        </Container>
    </Box>
)
}