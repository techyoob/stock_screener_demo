


// Core
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';



// Third party
// import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
// import Slider from "react-slick";
// import InfiniteCarousel from 'react-leaf-carousel';


// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


// Application
import {ReactComponent as ComingSoon} from '../../assets/svg/coming-soon.svg';
import CandleStickChart from '../../components/graphics/charts/Candlestick';
import StockAlerts from '../../components/classics/stockAlerts';
import Price from '../../components/graphics/charts/Price';
import Profile from '../../components/graphics/charts/Profile';

import ScreenerModes from '../../components/layout/screenerModes';
import useResponsiveDesign from "../../services/useResponsiveDevice";


import './screener.css';


const stockWatchModes = ['classics', 'graphics'];





const useStyles = makeStyles((theme) => ({
    graphicsRoot: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: '100px'
    },
    classicsRoot:{
        height:'100%',
    },
    containerView: {
        height: '100%',
        width:'100%',
        borderRadius: '5px',
        backgroundColor: '#2f3e4b',
        backgroundImage: 'linear-gradient(to right top, #3b4551, #3d4855, #3f4a58, #424d5c, #445060)',
        color: 'rgba(0, 0, 0, 0.6)',
        padding: '8px',
        boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
        overflow: 'hidden',
    }
}));




const StockWatch = props => {

    const [selectedMode, setSelectedMode ] = useState(stockWatchModes[0])

    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();

    const onModeChange = (mode) => {
        setSelectedMode(mode)
    }


    return (
        <div className='stock-watch-container' >
            <ScreenerModes
                    onModeChange={onModeChange}
                    selectedMode={selectedMode}
                    modes={stockWatchModes}/>
            {selectedMode == 'classics' && <StockWatchClassics {...props}/>}
            {selectedMode == 'graphics' && <StockWatchGraphics {...props}/>}
        </div>
      );
};





const StockWatchClassics = (props) => {
        const { selectedStock,
            selectedPage,
            onSearchStockSymbol
            } = props;

    const classes = useStyles();

    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();


    return (
        <div className='dashboard-selected-page'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={8} sx={{  maxHeight:isSmallScreen ? '600px' : 'none',height:isSmallScreen ? '350px' :'calc(100% - 200px)'}}>
                    <div className={classes.containerView}>                    
                        <CandleStickChart
                            ticker={selectedStock?.ticker}
                            selectedPage={selectedPage}/>                             
                    </div>
                </Grid>
                <Grid item xs={12} md={4} sx={{ maxHeight:isSmallScreen ? '220px' : 'none', height:'calc(100% - 200px)'}}>
                    <div className={classes.containerView}>
                        <Profile
                            ticker={selectedStock?.ticker}
                            selectedPage={selectedPage}/>
                    </div>
                </Grid>
                <Grid item xs={12} sx={{  height:'210px'}}>
                    <div className={classes.containerView}>
                        <StockAlerts 
                                ticker={selectedStock?.ticker}
                                selectedPage={selectedPage}/>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};










// {testy.map((item, i)=>{
//     return (
//         <div key={i} styles={{backgroundColor:'red', width:'80px', height:'50px'}}>
//             {item}
//         </div>)
// })}







const StockWatchGraphics = (props) => {
    const classes = useStyles();
    // const filters = Object.keys(defaultGraphicsQuery?.filter)
    // // const [sortBy, setSortBy ] = useState(fundamentalsModes[0])
    // const [query, setQuery] = useState(defaultClassicsQuery)

    // const [fundamentals, setFundamentals] = useState([])
    // const [paginationSize, setPaginationSize] = useState(0)
    // const [updatedAt, setUpdatedAt]=useState('')


    // const {status, data, isLoading, isSuccess, error, refetch }  = useTradersQuery({ selectedPage:'fundamentals', endpoint:'classics', query})



    // useEffect(()=>{
    //     refetch({cancelRefetch:true})
    // }, [query])

    return (
        <div className={classes.graphicsRoot} >
            <ComingSoon height={'50%'} width={'50%'}/>
        </div>
    );
};



























// const StockWatch = props => {
//     const { selectedStock,
//             selectedPage,
//             onSearchStockSymbol
//             } = props


//     const [selectedMode, setSelectedMode ] = useState(stockWatchModes[0])


//     // const onDataRequest=(query,endpoint)=>{
//     //     refreshData({...query, ticker:selectedStock.ticker}, `${selectedMode}/${endpoint}`)
//     // }

//     return (
//         <React.Fragment>
//             <div className='screener-dashboard-page-body stock-watch-body'>
//                 <div className='screener-modes'>
//                     {stockWatchModes?.map((item, i)=>{
//                         return (
//                             <div 
//                                 className={`screener-mode${item===selectedMode? '-selected' : ''}`}
//                                 key={i}
//                                 onClick={()=>setSelectedMode(item)}>
//                                     {item}
//                             </div>)
//                     })}
//                 </div>
//                 <div className='stock-watch-elements'>
//                     <div className='stock-watch-elements-section-I'>
//                         <div className='stock-watch-chart-container'>
//                             <CandleStickChart 
//                                 ticker={selectedStock?.ticker}
//                                 selectedPage={selectedPage}/>
//                         </div>
//                         <div className='stock-watch-price-container'>
//                             <Price 
//                                 ticker={selectedStock?.ticker}
//                                 selectedPage={selectedPage}/>
//                         </div>
//                     </div>
//                     <div className='stock-watch-elements-section-II'>
//                         <div className='stock-watch-profile-container'>
//                             <Profile
//                                 ticker={selectedStock?.ticker}
//                                 selectedPage={selectedPage}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>

//     );
// };






StockWatch.propTypes = {
    
};

export default StockWatch;



