


// Core
import React, { useContext, useState } from "react";


// Third
import { makeStyles } from '@mui/styles';
import { 
    FaSearch,
    FaBell,
    FaRegUser,
    FaUserCircle
  } from 'react-icons/fa';


// Application
import useResponsiveDesign from "../../../services/useResponsiveDevice";
import withStripsToggler from "../../controls/withStripsToggler.js";
import withNotificationModal from "../../controls/withNotificationModal";
import withUserAccountModal from "../../controls/withUserAccountModal";
import withDotsToggler from "../../controls/withDotsToggler.js";

import SearchBar from "../../controls/searchBar";
import Logo from "../../controls/logo";
import ScreenerMenu from "../menus/ScreenerMenu";
import UserMenu from "../menus/UserMenu";
import UserNotification from "../notification";
import UserAccount from "../account";

import { getCurrentUser } from "../../../services/authService";
import './appBar.css';






const useStyles = ({isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles(theme => ({
    appBar:{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: `${isLargeScreen ? '60px': isSmallScreen ? '50px' : '80px'}`,
        overflow: 'hidden',
        backgroundColor: `${isLargeScreen ? 'transparent': '#181d2388'}`,
        textTransform: 'capitalize',
        zIndex: 3,
    },
    appBarExt:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: `80px`,
        overflow: 'hidden',
        backgroundColor: `${isLargeScreen ? 'transparent': '#181d2388'}`,
        textTransform: 'capitalize',
    },
    sectionI:{
        width: isSmallScreen ? '80%' : '50%',
        alignItems: `${isLargeScreen ? 'flex-end' : 'center' }`
    },
    sectionII:{
        width: isSmallScreen ? '20%' : '50%',
        alignItems: `${isLargeScreen ? 'flex-end' : 'center' }`
    }
  }));






const AppBar = (props) => {
    const { selectedPage, onSearchStockSymbol } = props

    const barSections = ['I', 'II', 'III'];

    const { full_name } = getCurrentUser()
    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign()
    const classes = useStyles({isLargeScreen, isMidScreen, isSmallScreen})();


    const Menu = withStripsToggler(ScreenerMenu);
    const Notification = withNotificationModal(UserNotification)
    const Account = withUserAccountModal(UserAccount)
    const Settings = withDotsToggler(UserMenu);
    

    return (
        <React.Fragment>
            <div className={classes.appBar} >
                <div className={`${classes.sectionI} ${"appbar-section-I"}`}>
                    { (isMidScreen || isSmallScreen ) && <Menu {...props} height='100%' width='90px'/> }
                    { (isMidScreen || isSmallScreen ) && <Logo {...props} height='70%' width='60px'/>}
                    <div className="selected-page-title">
                        {selectedPage}
                    </div>
                </div>
                <div className={`${classes.sectionII} ${"appbar-section-II"}`}>
                    {(isMidScreen || isLargeScreen) && <SearchBar onSearchCallback={onSearchStockSymbol} width='55%' height='70%'/>}
                    {(isMidScreen || isLargeScreen) && <Notification  width='40px' height='40px'/>}
                    {(isMidScreen || isLargeScreen) && <Account width='40px' height='40px'/>}
                    {isSmallScreen && <Settings width='40px' height='40px'/>}
                </div>
            </div>
            {isSmallScreen 
            &&  <div className={classes.appBarExt} >
                    <SearchBar onSearchCallback={onSearchStockSymbol} width='85%' height='55%' />
                </div>}
        </React.Fragment>

    );
};



export default AppBar;



