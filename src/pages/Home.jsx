import { Box, Typography, Button} from "@mui/material";
import { useAuthContext } from "../context/auth/AuthContext";
import { useEffect } from "react";
import { allBooks, myBooks } from "../services/book";
import { useNavigate } from "react-router-dom";

export default function(){
    const navigate=useNavigate();
    const {user,logout} = useAuthContext();

    useEffect(()=>{
        allBooks().then((books)=>{
            console.log(books);
        })
        .catch((error)=>{
            console.log("Erroarea este", error);
        })

    },[]);
    return(
        <Box>
            <Typography>Home Page</Typography>
            {user ? (<Button onClick={logout}>Logout</Button>) : (
                <Button onClick={()=>{
                    navigate("/login");
                }}>Login</Button>
            )}
            
        </Box>
    )
}