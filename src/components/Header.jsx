import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/auth/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { searchBook } from "../services/book";
import { SearchBar } from "./SearchBar";
import { BookCard } from "./BookCard";


const pages = [{
  name: "Home",
  path: "/",
},
{
  name: "Manage Books",
  path: "/manage",
  auth: true,
},
{
  name: "About",
  path:"/about",
}

];
 

export function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  

  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  
  const updateTitle = (title) => {
    setTitle(title);
  };

  useEffect(() => {
    const requesting = async () => {
        setLoading(true);
        searchBook(title).then((data) => {
            console.log("then")
            setBooks(data.results);
        })
            .catch((err) => {
              console.log("error")
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    requesting();

}, [title])

  return (
    <Box>
    <AppBar position="fixed" >
      <Paper elevation={1} sx={{backgroundColor:"primary.light"}}>

      
      <Container maxWidth="lg" >
        <Toolbar disableGutters>
          
          <Box component="img" src="https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg"
          sx={{width:"40px",display: { xs: "none", md: "flex" }, mr: 1, color:"primary.main"}}></Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            goodReads
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              
              {pages.filter ((page)=> (page.auth ? Boolean(user) : true))
              .map((page)=> (
                <MenuItem
                    component={NavLink}
                    to={page.path}
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{
                      "&.active": {
                        "& p": {
                          color: "primary.main",
                          fontWeight: "bold",
                        },
                        backgroundColor: "action.selected",
                      },
                    }}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
              ))}
             
     
    
            </Menu>
     
          </Box>
          
          <Box component="img" src="https://s.gr-assets.com/assets/react_components/currently_reading/icn_default_CR_ltrail-16f28d39654104ceb329648a474943eb.svg"
          sx={{width:"40px", display: { xs: "flex", md: "none" }, mr: 1 }}></Box>
          <Typography
            variant="h5"
            noWrap
            component={NavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "primary.main",
              
              textDecoration: "none",
            }}
          >
            goodReads
          </Typography>
         
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages
              .filter((page) => (page.auth ? Boolean(user) : true))
              .map((page) => (
                <Button
                  key={page.name}
                  LinkComponent={NavLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "primary.main",
                    display: "block",
                    "&.active": {
                      color: "primary.main",
                      fontWeight: "bold",
                      backgroundColor: "action.selected",
                    },
                  }}
                >
                  {page.name}
                </Button>
              ))}
              <Box sx={{my:2, mx:1}}>
              <SearchBar onSearch={updateTitle}/>
              </Box>
     
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user ? (
                  <Avatar sx={{bgcolor: 'primary.dark' }}>
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </Avatar>
                ) : (
                  <Avatar sx={{bgcolor:'primary.dark' }}/>
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user ? (
                <MenuItem onClick={()=>{
                  logout();
                  navigate("/");
                }}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              ) : (
                <MenuItem
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      </Paper>
     
    </AppBar>
    
    </Box>
  );
}
