

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
        background: 'rgb(68,79,82)',
        background: 'linear-gradient(151deg, rgba(68,79,82,1) 0%, rgba(77,93,96,1) 100%)',
    }
  }));


const SideBar = (props) => {
    const { isLargeScreen } = useResponsiveDesign()
    const classes = useStyles(isLargeScreen)();

    return (
        <div className={classes.sideBar}>
            <div className="screener-menu-logo">
                <Logo height='100%'/>
            </div>
            <ScreenerMenu {...props} />
        </div>
    );
};



export default SideBar;
