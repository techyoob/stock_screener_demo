



// Core



// Third
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Outlet } from "react-router-dom"




// Application
import './mainlayout.css';







const MainLayout = () => {
    
    const theme = createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 360,
            md: 700,
            lg: 1500,
            xl: 1636,
          },
        },
        palette: {
          secondary: {
            main: '#53a2a9'
          }
        }
      });

    return (
        <ThemeProvider theme={theme}>
            <main className="main-layout">
                <Outlet />
            </main>
        </ThemeProvider>
    )
}

export default MainLayout;
