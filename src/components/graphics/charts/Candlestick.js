




// Core
import React, { useState, useEffect, useRef } from 'react';


// Third party
import ReactApexChart from "react-apexcharts";

// Application
import './charts.css'
import useTradersQuery from '../../../services/useTradersQuery'
import { abbreviateNumber } from '../../../util/abbreviateNumber';
import Throbber from '../../controls/throbber';
import NoData from '../../nodata';
import { candleStickConfig } from './candlestickConf';
import useResponsiveDesign from '../../../services/useResponsiveDevice';



const CandleStickChart = (props) => {
    const candleSizeList = ['1m', '5m', '15m', '30m', '1h', '1d'];
    const { selectedPage, ticker } = props

    
    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign();

    const RESET_TIMEOUT = 200;
    let movement_timer = null;
    const [zoomDomain, setZoomDomain] = useState({})
    const [selectedDomain, setSelectedDomain] = useState({})
    const candlesChartRef = useRef(null);
    const [chartSize, setChartSize] = useState({
        width:0,
        height:0,
    });

    const [selectedSize, setSelectedSize ] = useState(candleSizeList[5])

    const [query, setQuery] = useState({
        ticker:ticker,
        candle_size:selectedSize
    })

    const [candles, setCandles]=useState([])
    const [volume, setVolume]=useState([])

    const {status, data, isLoading, isSuccess, error, refetch }  = useTradersQuery({ selectedPage, endpoint:'classics/chart', query})
    
    useEffect(() => {
        const resizeListener = () => {

            clearInterval(movement_timer);
            movement_timer = setTimeout(()=>{

                if (candlesChartRef.current){
             
                    setChartSize({
                        width:candlesChartRef.current.offsetWidth,
                        height:candlesChartRef.current.offsetWidth
                    });
                }

            }, RESET_TIMEOUT);

        };

        resizeListener();
        window.addEventListener('resize', resizeListener);    
        return () => {
          window.removeEventListener('resize', resizeListener);
        }
    }, [])

    useEffect(()=>{

        refetch({cancelRefetch:true})
    }, [query])


    useEffect(()=>{
        setQuery({
            ticker:ticker,
            candle_size:selectedSize
        })
    }, [ticker])

    useEffect(()=>{


        if (isSuccess && Array.isArray(data?.ohlc)){
            setCandles(data?.ohlc)
        } else {
            setCandles([])
        }

        if (isSuccess && Array.isArray(data?.volume)){
            setVolume(data?.volume)
        } else {
            setVolume([])
        }



    }, [data])


    const onCandleSizeChange = (size) => {
        setSelectedSize(size)
        setQuery({
            ticker:ticker,
            candle_size:size
        })
    }


    return (
        <React.Fragment>
            {isLoading 
                ? <Throbber />
                : candles.length > 0 && volume.length > 0
                    ?   <React.Fragment>
                            <div className='candles-chart-period-container'>
                                {candleSizeList.map((item, i)=>{
                                    return (<div key={i}
                                                className={`candle-period${item===selectedSize?'-selected' : ''}`}
                                                onClick={()=>onCandleSizeChange(item)}>
                                                {item}
                                            </div>);
                                })}
                            </div>
                            <div className='candlestick-chart-container'>
                                <ReactApexChart options={candleStickConfig.options} series={[{data:candles}]} type="candlestick"  height={isSmallScreen ? '150' : '330'}/>
                                <ReactApexChart options={candleStickConfig.optionsBar} series={[{data:volume}]} type="bar"  height="100"/>
                            </div>
                        </React.Fragment>
                    :   <NoData element='chart'/>
                }

        </React.Fragment>
    );
};

export default CandleStickChart;
