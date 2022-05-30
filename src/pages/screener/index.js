


// Core
import React, { useContext, useState } from "react";

// Third party
import { useNavigate  } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Grid } from "@mui/material";

// Application
import AuthContext from "../../services/AuthProvider";
import useResponsiveDesign from "../../services/useResponsiveDevice";
import menuItems from '../../data/menu.json';

import SideBar from "../../components/layout/sideBar";
import AppBar from "../../components/layout/appBar";

// import MainMenu from "../../menu";
import Fundamentals from "./Fundamentals";
import StockWatch from "./StockWatch";

import Logo from "../../components/controls/logo";
import ScreenerMenu from "../../components/layout/menus/ScreenerMenu";
import {ReactComponent as ShortResolution } from '../../assets/svg/short-resolution.svg';

import './screener.css'








const useStyles = ({isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles(theme => ({
    screenerRoot: {
        minHeight:'800px',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        color: '#9bc5b1',
        backgroundColor: '#3a4552',
        background: '#3a4552',
        background: 'linear-gradient(300deg, #2b333f 0%, #3d444d 35%, #222933 100%)', 
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
        flexDirection: 'column',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
      [theme.breakpoints.up('lg')]: {
        display:'flex',
        flexDirection:'row',
      },
      [theme.breakpoints.up('xl')]: {
      },
    },
    dashboardSelectedPage:{
        width:'100%',
        height:`calc(100% - ${isLargeScreen ? '60px': isSmallScreen ? '130px' : '80px'})`,
        overflow:'hidden',
    },
    sideBar:{        
        display: 'flex',
        flexDirection:'column',
        width: '16vw',
        overflow: 'hidden',
        backgroundColor:'#181d2388',
    },
    appBar:{
        display: 'flex',
        width: '100%',
        height: '60px',
        overflow: 'hidden',
        backgroundColor:'green',
        textTransform: 'capitalize',
    }
  }));



  const ScreenerDashboard = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { isSmallScreen, isMidScreen, isLargeScreen, isXSScreen } = useResponsiveDesign()

    const classes = useStyles({isSmallScreen, isMidScreen, isLargeScreen})();

    const [selectedPage, setSelectedPage] = useState(menuItems[0])
    const [stock, setStock] = useState({
        name:"",
        ticker:"AAPL"
    })

    const onSelectPage = (selected) => {
        setSelectedPage(selected)
    }

    const onSearchStockSymbol = (ticker) => {
        setStock({...stock, ticker:ticker.toUpperCase()})
        onSelectPage('stock watch')
    }

    const onLogout = async () => {
        setAuth({});
        localStorage.removeItem("user");
        navigate('/');
    }

  

    return (
        <React.Fragment>
        { isXSScreen 
        ?   <div className="short-resolution-container">
                <ShortResolution width='100%' />
            </div>
        :   <div className={classes.screenerRoot}>
                {isLargeScreen && <SideBar 
                                      items={menuItems}
                                      selectedPage={selectedPage}
                                      onSelectPage={onSelectPage}
                                      onLogout={onLogout}
                                        />}
                <div className="dashboard-main-container">
                    <AppBar
                        items={menuItems}
                        onSelectPage={onSelectPage}
                        selectedPage={selectedPage}
                        onSearchStockSymbol={onSearchStockSymbol}
                        onLogout={onLogout}/>
                    <div className={classes.dashboardSelectedPage}>
                        {screenerSelector({
                                onSearchStockSymbol,
                                selectedStock:stock,
                                selectedPage
                                })[selectedPage]}
                    </div>
                </div>                    
            </div>}
        </React.Fragment>
 
    );
};


export default ScreenerDashboard;





  const screenerSelector = (props) => ({
    "fundamentals":<Fundamentals {...props}/>,
    "stock watch": <StockWatch {...props}/>
  })
