


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
import Alerts from "./Alerts";
import StockWatch from "./StockWatch";
import Portfolio from "./Portfolio";

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

    const [selectedPage, setSelectedPage] = useState(menuItems[2])
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















//   const ScreenerDashboard = () => {
//     const { auth, setAuth } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const { isLargeScreen, isXSScreen } = useResponsiveDesign()

//     const classes = useStyles(isLargeScreen)();

//     const [selectedPage, setSelectedPage] = useState(menuItems[2])
//     const [stock, setStock] = useState({
//         name:"",
//         ticker:"AAPL"
//     })

//     const onSelectPage = (selected) => {
//         setSelectedPage(selected)
//     }

//     const onSearchStockSymbol = (ticker) => {
//         setStock({...stock, ticker:ticker.toUpperCase()})
//         onSelectPage('stock watch')
//     }

//     const onLogout = async () => {
//         setAuth({});
//         localStorage.removeItem("user");
//         navigate('/');
//     }

//     // TODO:
//     // Implement using example 
//     // https://levelup.gitconnected.com/using-breakpoints-and-media-queries-in-material-ui-47470d3c43d9


//     return (
//         <React.Fragment>
//         { isXSScreen 
//         ?   <div className="short-resolution-container">
//                 <ShortResolution width='100%' />
//             </div>
//         :   <div className={classes.screenerRoot}>
//                 {isLargeScreen && <SideBar 
//                                         items={menuItems}
//                                         selectedPage={selectedPage}
//                                         onSelectPage={onSelectPage}
//                                         onLogout={onLogout} />}
//                 <div className="dashboard-main-container">
//                     <AppBar 
//                         items={menuItems}
//                         onSelectPage={onSelectPage}
//                         selectedPage={selectedPage}
//                         onSearchStockSymbol={onSearchStockSymbol}
//                         onLogout={onLogout}/>
//                     {screenerSelector({
//                         onSearchStockSymbol,
//                         selectedStock:stock,
//                         selectedPage
//                     })[selectedPage]}
//                 </div>
//             </div>}
//         </React.Fragment>
 
//     );
// };

export default ScreenerDashboard;





  const screenerSelector = (props) => ({
    "fundamentals":<Fundamentals {...props}/>,
    "alerts":<Alerts {...props}/>,
    "stock watch": <StockWatch {...props}/>,
    "portfolio":<Portfolio {...props}/> 
  })































// const ScreenerDashboard = () => {
//     const { auth, setAuth } = useContext(AuthContext);
//     const navigate = useNavigate();

//     // const smallScreen = useMediaQuery('(min-width:600px)');
//     // const midScreen = useMediaQuery('(min-width:600px)');
//     // const largeScreen = useMediaQuery('(min-width:600px)');

//     const classes = useStyles();
//     const theme = useTheme();
    
//     const smallScreen = useMediaQuery(theme.breakpoints.up('sm'));
//     const midScreen = useMediaQuery(theme.breakpoints.up('md'));
//     const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));

//     const [selectedPage, setSelectedPage] = useState(menuItems[0])
//     const [stock, setStock] = useState({
//       name:"",
//       ticker:"AAPL"
//     })

//     const onSelectPage = (selected) => {
//         setSelectedPage(selected)
//     }

//     const onSearchStockSymbol = (ticker) => {
//         setStock({...stock, ticker:ticker.toUpperCase()})
//         onSelectPage('stock watch')
//     }

//     const onLogout = async () => {
//         setAuth({});
//         localStorage.removeItem("user");
//         navigate('/');
//     }

//     // TODO:
//     // Implement using example https://levelup.gitconnected.com/using-breakpoints-and-media-queries-in-material-ui-47470d3c43d9


//     return (
//         <div className={classes.root}>     
//             <div className="screener-dashboard-menu">
//                 <MainMenu 
//                     items={menuItems}
//                     selectedPage={selectedPage}
//                     onSelectPage={onSelectPage}
//                     onSearchStockSymbol={onSearchStockSymbol}
//                     onLogout={onLogout}/>
//             </div>
//             <div className="screener-dashboard-page-container">
//                 <div className="screener-dashboard-page-header">
//                     <Toolbar 
//                         onSearchStockSymbol = {onSearchStockSymbol}
//                         selectedPage={selectedPage}/>
//                 </div>
//                 {screenerSelector({
//                     onSearchStockSymbol,
//                     selectedStock:stock,
//                     selectedPage
//                 })[selectedPage]}
//             </div>
//         </div>
//     );
// };










  
// const ScreenerDashboard = () => {
//     const { auth, setAuth } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [selectedPage, setSelectedPage] = useState(menuItems[0])
//     const [stock, setStock] = useState({
//       name:"",
//       ticker:"AAPL"
//     })

//     const onSelectPage = (selected) => {
//         setSelectedPage(selected)
//     }

//     const onSearchStockSymbol = (ticker) => {
//         setStock({...stock, ticker:ticker.toUpperCase()})
//         onSelectPage('stock watch')
//     }

//     const onLogout = async () => {
//         setAuth({});
//         localStorage.removeItem("user");
//         navigate('/');
//     }

//     const ScreenerWithQuery = withTraderQueryHOC(screenerSelector[selectedPage], selectedPage)

//     return (
//         <div className="screener-dashboard-view">            
//             <div className="screener-dashboard-menu">
//                 <MainMenu 
//                     items={menuItems}
//                     selectedPage={selectedPage}
//                     onSelectPage={onSelectPage}
//                     onSearchStockSymbol={onSearchStockSymbol}
//                     onLogout={onLogout}/>
//             </div>
//             <div className="screener-dashboard-page-container">
//                 <div className="screener-dashboard-page-header">
//                     <Toolbar 
//                         onSearchStockSymbol={onSearchStockSymbol}
//                         selectedPage={selectedPage}/>
//                 </div>
//                 <div className="screener-dashboard-page-body">
//                     <ScreenerWithQuery 
//                         onSearchStockSymbol={onSearchStockSymbol}
//                         selectedStock={stock}
//                         selectedPage={selectedPage}/>
//                 </div>
//             </div>
//         </div>
//     );
// };
