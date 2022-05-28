


// Core
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


// Third party
import { makeStyles } from '@mui/styles';
import Dropdown from "react-overlays/Dropdown";
import { useDropdownMenu, useDropdownToggle } from "react-overlays";
import { 
    FaMapMarkerAlt,
    FaExchangeAlt,
    FaRegMoneyBillAlt,
    FaColumns
  } from 'react-icons/fa';

import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';




// Application
import { FilterComponent } from '../../components/controls/filter';
import { abbreviateNumber } from '../../util/abbreviateNumber';
import List from '../../components/layout/list';
import Throbber from '../../components/controls/throbber';

import useWindowDimensions from '../../services/useWindowDimensions';

import useTradersQuery from '../../services/useTradersQuery';
import ScreenerModes from '../../components/layout/screenerModes';
import {ReactComponent as ComingSoon} from '../../assets/svg/coming-soon.svg';


const fundamentalsModes = ['classics', 'graphics'];



const Fundamentals = props => {

    const [ selectedMode, setSelectedMode ] = useState(fundamentalsModes[0])

    const onModeChange = (mode) => {
        setSelectedMode(mode)
    }

    return (
        <div className='dashboard-selected-page'>
            <ScreenerModes
                onModeChange={onModeChange}
                selectedMode={selectedMode}
                modes={fundamentalsModes}/>
            {selectedMode == 'classics' && <FundamentalsClassics {...props}/>}
            {selectedMode == 'graphics' && <FundamentalsGraphics {...props}/>}
        </div>
    );
};






const classicsListColumns = {
    price:["last", "change", "change_percentage", "volume", "market_cap"],
    profile:["country", "exchange", "sector", ]
}





const defaultClassicsQuery = {

    "filter":{
        "profile__exchange":{"iexact":"all"},
        "price__market_cap":{
            "gte":0,
            "lte":10000000000000
            },
        "profile__country":{"iexact":"all"},
        },
    "sort":{
        "by":"price__market_cap",
        "ascend":false
        },
    "page":{
        "at":1,
        "size":6
        },
    "columns":['ticker', 'profile__company',  'price__last', 'price__change', 'price__change_percentage', 'price__market_cap'],
}


const FundamentalsClassics = (props) => {
    const { onSearchStockSymbol } = props;

    const filters = Object.keys(defaultClassicsQuery?.filter)
    const [query, setQuery] = useState(defaultClassicsQuery)
    const [classicsList, setClassicsList] = useState([])

    const [paginationSize, setPaginationSize] = useState(0)
    const [updatedAt, setUpdatedAt]=useState('')

    const {status, data, isLoading, isSuccess, error, refetch }  = useTradersQuery({ selectedPage:'fundamentals', endpoint:'classics', query})


    useEffect(()=>{
        // refetch({cancelRefetch:true})
        onRefreshData()

    }, [query])


    useEffect(()=>{
        if (isSuccess && Array.isArray(data?.classics)){
            setClassicsList(data?.classics);
            setPaginationSize(Math.ceil(data?.total/query?.page.size));
            setUpdatedAt(data.updated);
        } else {
            setClassicsList([]);
        }

    }, [data])


    const onFilterChange = (newFilterState) =>{
        setQuery({...query, filter:{...query.filter, ...newFilterState}})
    }


    const onColumnChange = (newColumns) =>{        
        setQuery({...query, columns:[...newColumns]})
    }


    const onPaginationChange = (pagination) =>{
        if(pagination?.action==="at") {
            setQuery({...query, page:{...query.page, at:pagination.value}})
        } else if (pagination?.action==="size") {
            setQuery({...query, page:{...query.page, size:pagination.value}})
        }

    }


    const onRefreshData = () => {
        // refetch({cancelRefetch:true})
        // TODO:
        // Add logic to load fundamentals json and crop sub array with page size and page number (at:1)
    }


    return (
        <React.Fragment>
            <div className='fundamentals-classics-filter-options-bar'>
                <FilterComponent
                        filterName={'columns'}
                        onFilterStateChange={onColumnChange}
                        filterState={query?.columns}/>
                {filters.map((name, j)=>{
                    
                    return (<FilterComponent
                                key={j}
                                filterName={name.split('__')[1]}
                                onFilterStateChange={onFilterChange}
                                filterState={query?.filter[name]}/>)
                })}
            </div>
            <div className='fundamentals-classics-list-container'>
                {isLoading
                    ? <Throbber />
                    : <List
                        listColumns={query?.columns}
                        rows={classicsList}
                        paginationSize={paginationSize}
                        updatedAt={updatedAt}
                        onPaginationChange={onPaginationChange}
                        onListItemSelect={onSearchStockSymbol}
                        onRefreshData={onRefreshData}
                        isLoading={isLoading}/>
                }
            </div>
        </React.Fragment>
    );
};







const useStyles = makeStyles((theme) => ({
    tabsRoot: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop: '100px'
    }
}));



const FundamentalsGraphics = (props) => {
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
        <div className={classes.tabsRoot} >
            <ComingSoon height={'50%'} width={'50%'}/>
        </div>
    );
};























// const FundamentalsClassics = () => {
// }

// const Fundamentals = props => {

//     const { selectedPage, onSearchStockSymbol } = props

//     const filters = Object.keys(defaultQuery?.filter)

//     const [selectedMode, setSelectedMode ] = useState(fundamentalsModes[0])
//     const [sortBy, setSortBy ] = useState(fundamentalsModes[0])
//     const [query, setQuery] = useState(defaultQuery)

//     const [fundamentals, setFundamentals] = useState([])
//     const [paginationSize, setPaginationSize] = useState(0)
//     const [updatedAt, setUpdatedAt]=useState('')


//     const {status, data, isLoading, isSuccess, error, refetch }  = useTradersQuery({ selectedPage, endpoint:selectedMode, query})



//     useEffect(()=>{
//         refetch({cancelRefetch:true})
//     }, [query])



//     useEffect(()=>{

//         console.log(' new data is ', data);


//         if (isSuccess && Array.isArray(data?.classics)){
//             setFundamentals(data?.classics);
//             setPaginationSize(Math.ceil(data?.total/query?.page.size))
//             setUpdatedAt(data.updated)
//         } else {
//             setFundamentals([]);
//         }

//     }, [data])


//     const onListFilterChange = (newFilterState) =>{
//         setQuery({...query, filter:{...query.filter, ...newFilterState}})
//     }

//     const onPaginationChange = (pagination) =>{
//         if(pagination?.action==="at") {
//             setQuery({...query, page:{...query.page, at:pagination.value}})
//         } else if (pagination?.action==="size") {
//             setQuery({...query, page:{...query.page, size:pagination.value}})
//         }
//     }

//     const onRefreshData = () => {
//         refetch({cancelRefetch:true})
//     }

//     return (
//         <React.Fragment>
//             <div className='screener-dashboard-page-body fundamentals-body'>
//                 <div className='screener-modes'>
//                     {fundamentalsModes?.map((item, i)=>{
//                         return (
//                             <div 
//                                 className={`screener-mode${item===selectedMode? '-selected' : ''}`}
//                                 key={i}
//                                 onClick={()=>setSelectedMode(item)}>
//                                     {item}
//                             </div>)
//                     })}
//                 </div>
//                 <div className='fundamentals-filter-options'>
//                     {filters.map((name, j)=>{  
//                         return (<FilterComponent 
//                                     key={j}
//                                     filterName={name}
//                                     onListFilterChange={onListFilterChange}
//                                     query={query}
//                                     onSetQuery={setQuery}
//                                     filterIcon={filterLogoSelector[name]}
//                                     filterComponent={filterSelector[name]}/>)
//                     })}
//                 </div>
//                 <div className='fundamentals-list-container'>
//                     {isLoading
//                         ? <Throbber />
//                         : <List
//                             columns={fundamentalsListColumns}
//                             data={fundamentals}
//                             paginationSize={paginationSize}
//                             updatedAt={updatedAt}
//                             onPaginationChange={onPaginationChange}
//                             onListItemSelect={onSearchStockSymbol}
//                             onRefreshData={onRefreshData}
//                             isLoading={isLoading}/>
//                     }
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// };

Fundamentals.propTypes = {

};

export default Fundamentals;
















/**********************************************
        Fundamentals Filter Components
***********************************************/






const CountryFilter = (props) => {
    
    const {filterState, setFilterState } = props
    const countries = ['all', 'us', 'canada', 'france'];
    
    const handleCheck = (event) => {
        setFilterState({country:event.target.value});
    };

    return (
        <div className='countries-filter-list' >
            {countries.map((country, i)=>{
                return (
                    <label className='country-filter-item' key={i}>
                        <input
                            value={country}
                            type="radio"
                            name="countries"
                            onChange={handleCheck}
                        />
                        <span>{country}</span>
                    </label> )
            })}
        </div>
    );
};

const ExchangeFilter = (props) => {

    const exchanges = ['all', 'nasdaq', 'nyse'];
    const {filterState, setFilterState } = props

    
    const handleChange = (event) => {        
        setFilterState({exchange:event.target.value});
    };

    return (
        <div className='exchange-filter-list' >
            {exchanges.map((exchange, i)=>{
                return (
                    <label className='exchange-filter-item' key={i}>
                        <input
                            value={exchange}
                            type="radio"
                            name="exchages"
                            onChange={handleChange}
                        />
                        <span>{exchange}</span>
                    </label>
                )
            })}
        </div>
    );
};

const MarketCapFilter = (props) => {

    const { filterState, setFilterState} = props
    
    const capRanges ={ all:{min:0, max:10000000000000},
                       mega:{min:200000000000, max:10000000000000},
                       large:{min:10000000000, max:199999999999},
                       mid:{min:2000000000, max:19999999999},
                       small:{min:300000000, max:1999999999},
                       micro:{min:50000000, max:299999999},
                       nano:{min:0, max:49999999},
                    }

    const handleChange = (event) => {
        setFilterState({market_cap:capRanges[event.target.value]})
    }

    return (
        <div className='market-cap-filter-list'>
            {Object.keys(capRanges).map((range, i)=>{
                
                const rangeMin = capRanges[range]['min']
                const rangeMax = capRanges[range]['max']

                const rangeLabel=`${range} ($${abbreviateNumber(rangeMin)}-${abbreviateNumber(rangeMax)})`

                return (
                    <label className='market-cap-filter-item' key={i}>
                        <input
                            value={range}
                            type="radio"
                            name="marketCap"
                            onChange={handleChange}
                        />
                        <span>{rangeLabel}</span>
                    </label>
                )
            })}
        </div>
    );
};

const FieldsFilter = (props) => {

    const fields = defaultClassicsQuery['filter']['columns']
    const selectedFields = []
    const {filterState, setFilterState } = props

    
    const handleChange = (values) => { 

        // setFilterState({columns:values});
    };

    return (
        <div className='exchange-filter-list' >
            {fields.map((field, i)=>{
                if (field )
                return (
                    <label className='exchange-filter-item' key={i}>
                        <input
                            value={field}
                            type="checkbox"
                            name="fields"
                            onChange={handleChange}
                        />
                        <span>{field.replace(/_/g, ' ')}</span>
                    </label>
                )
            })}
        </div>
    );
};


const filterLogoSelector =  {
    "country":<FaMapMarkerAlt />,
    "exchange":<FaExchangeAlt />,
    "market_cap": <FaRegMoneyBillAlt />,
    "columns":<FaColumns />
}



