import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#432F20',
            light: "#F4F1EA",
            dark: '#B9AD99',
        },
        secondary:{
            main:"#F9F7F4",
        }
        
    }
   
});

export default function ({children}){
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}