


// Application 
import { abbreviateNumber } from "../../../util/abbreviateNumber";






    export const candleStickConfig = {
        series: [{
            data: []
        }],

        options: {
            chart: {
                type: 'candlestick',
                height: 250,
                id: 'candles',
                toolbar: {
                    autoSelected: 'pan',
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            grid:{
                borderColor: '#79869188',
                padding: {
                    left: 0,
                    right: 0
                } 
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#338F85',
                        downward: '#D7766F'
                    }
                }
            },
            xaxis: {
                type: 'datetime',
                labels:{
                    style: {
                        colors: '#a7a7a7',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                    },
                    padding: {
                        left: 0,
                        right: 0
                    },
                }  
            },
            yaxis: {
                labels:{
                    formatter: (price) => { return price?.toFixed(2) },
                    style: {
                        colors: '#a7a7a7',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                    },
                    padding: {
                        left: 0,
                        right: 0
                      } 
                }          
            },
            tooltip: {
                x:{
                    format: 'dd/MM/yy'
                }
            }
        },

        seriesBar: [{
            name: 'volume',
            data: []
        }],

        optionsBar: {
            chart: {
                height: 160,
                type: 'bar',
                brush: {
                    enabled: true,
                    target: 'candles'
                },
                selection: {
                    enabled: true,
                    fill: {
                        color: '#ccc',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                    }
                },
            },
            grid:{
                borderColor: '#79869188',
                padding: {
                    left: 0,
                    right: 0
                    } 
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%',
                    colors: {
                        ranges: [{
                            from: -1000,
                            to: 0,
                            color: '#151C34'
                        }, {
                            from: 1,
                            to: 10000,
                            color: '#151C34'
                        }],
                    },
                }
            },
            stroke: {
                width: 2,
                colors: ['#467DBB']
            },
            xaxis: {
                type: 'datetime',
                axisBorder: {
                    offsetX: 13
                },
                labels: {
                    show: false,
                    style: {
                        colors: '#a7a7a7',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                    },
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    formatter: (vol) => { return abbreviateNumber(vol) },
                    style: {
                        colors: '#a7a7a7',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                    },
                    padding: {
                        left: 0,
                        right: 0
                      } 
                },
          
            }
        },
    };







