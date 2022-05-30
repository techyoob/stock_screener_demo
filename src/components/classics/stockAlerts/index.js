





// Core
import React, { useEffect, useState } from 'react';



// Third Party
import { makeStyles } from '@mui/styles';
import Carousel from 'react-elastic-carousel';
import { Grid } from '@mui/material';

import { FaSortUp, FaSortDown } from "react-icons/fa";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";



// Application
import useResponsiveDesign from '../../../services/useResponsiveDevice';
import useTradersQuery from '../../../services/useTradersQuery';
import { abbreviateNumber } from '../../../util/abbreviateNumber';

import './stockAlerts.css';
import { borderRadius } from '@mui/system';
import alertsData from '../../../data/alerts.json'





const useStyles = ({isLargeScreen, isMidScreen, isSmallScreen}) => makeStyles(theme => ({
    carouselContainer:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
            display: "none"
        },
    },
    carouselItemContainer: {
        width:'200px',
        height:'150px',
        marginBottom:'5px',
        flexShrink:'0',
        overflow:'hidden',
        backgroundColor:'#26344a',
        borderRadius:'15px',
    },
    gridRow:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:'15px',
        color:'#a7a7a7'
    },
    bullValue:{
        color:'green'
    },
    bearValue:{
        color:'red'
    }
}));


const breakPoints = [
    { width: 1, itemsToShow: 1, itemsToScroll: 1 },
    { width: 500, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ];
  

const StockAlerts = (props) => {

    const { selectedPage, ticker } = props

    const [alerts, setAlerts]=useState({});
    const [query, setQuery] = useState({
        ticker:ticker
    })

    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();
    const classes = useStyles({isSmallScreen})();
    const {status, data, isLoading, error, refetch }  = useTradersQuery({ selectedPage, endpoint:'classics/alerts', query})



    useEffect(()=>{
        setQuery({
            ticker:ticker
        })
    }, [ticker])

    useEffect(()=>{
        onRefreshData()
    }, [query])


    const onRefreshData = () => {
        setAlerts(alertsData)
    }

    return (
        <div className={`${classes.carouselContainer} ${'stock-alerts-carousel'}`} >
            <Carousel
                itemsToScroll={1} 
                breakPoints={breakPoints} >                
                    {Object.keys(alerts).length === 0 
                    ? <div className='no-alert-container'> </div>
                    : Object.keys(alerts).map((item, i)=>{
                        return (
                            <div key={i} className={classes.carouselItemContainer}>
                                {stockAlertSelector(alerts[item])[item]}
                            </div>)
                    })}
            </Carousel>
        </div>
    );
};

export default StockAlerts;






/**************************************************
 *          Classic Alerts
 *******************************************************/







const Price = (props) => {
    const { last, change, change_percentage, market_cap, volume, updated}=props;

    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();
    const classes = useStyles({isSmallScreen})();


    return (
        <Grid container spacing={0}>
            <Grid item xs={12} className={classes.gridRow} sx={{  fontSize:'18px', backgroundColor:'#192a45'}}>
              Price
            </Grid>
            <Grid item xs={12} className={classes.gridRow} sx={{ marginBottom:'5px', marginTop:'5px', fontSize:'18px', fontWeight:'bold', color:'white'}}>
                {`$${Math.floor(last*100)/100}`}
            </Grid>
            <Grid item xs={12} 
                className={`${classes.gridRow} ${Math.sign(change) === 1 ? classes.bullValue : classes.bearValue}`} 
                sx={{fontSize:'15px', marginBottom:'5px'}}>
                    <span > 
                        { Math.sign(change) === 1 ? <IoCaretUp size={'18px'}/> : <IoCaretDown size={'18px'}/> } 
                    </span>
                    {`$${Math.floor(change*100)/100}`}
                    {` ( ${Math.floor(change_percentage*100)/100}% )`}
            </Grid>
            <Grid item xs={6} className={classes.gridRow} sx={{fontSize:'12px'}}>
                Market Cap
            </Grid>
            <Grid item xs={6} className={classes.gridRow} sx={{fontSize:'12px'}}>
                Volume
            </Grid>
            <Grid item xs={6} className={classes.gridRow} sx={{fontSize:'15px', color:'white', marginBottom:'5px'}}>
                {`$${abbreviateNumber(volume)}`}
            </Grid>
            <Grid item xs={6} className={classes.gridRow} sx={{fontSize:'15px', color:'white', marginBottom:'5px'}}>
                {`$${abbreviateNumber(market_cap)}`}
            </Grid>
            <Grid item xs={12} className={classes.gridRow} sx={{fontSize:'11px'}}>
                {`As of ${new Date(updated * 1000).toLocaleString()}`}
            </Grid>
        </Grid>

    );
};



const stockAlertSelector = (props) => ({
    "price":<Price {...props}/>
})
