

// Core
import React, { useContext, useState } from "react";


// Third
import { makeStyles } from '@mui/styles';



// Application
import useResponsiveDesign from "../../../services/useResponsiveDevice";

import Logo from "../../controls/logo";
import ScreenerMenu from "../menus/ScreenerMenu";
import './sideBar.css'
import zIndex from "@mui/material/styles/zIndex";






const useStyles = props => makeStyles(theme => ({
    sideBar:{        
        display: 'flex',
        flexDirection:'column',
        width: '16vw',
        minWidth:'250px',
        maxWidth: '280px',
        overflow: 'hidden',
        backgroundColor:'#181d2388',
    }
  }));


const SideBar = (props) => {
    const { isLargeScreen } = useResponsiveDesign()
    const classes = useStyles(isLargeScreen)();

    return (
        <div className={classes.sideBar}>
            <div className="screener-menu-logo">
                <Logo height='60%' />
            </div>
            <ScreenerMenu {...props} />
        </div>
    );
};



export default SideBar;
