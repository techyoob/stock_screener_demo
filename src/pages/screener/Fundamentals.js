
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
    FaColumns,
    FaThLarge
  } from 'react-icons/fa';

import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';




// Application
import CapMap from '../../feature/CapMap';
import VolMap from '../../feature/VolMap';

import { FilterComponent } from '../../components/controls/filter';
import List from '../../components/layout/list';
import Throbber from '../../components/controls/throbber';

import useWindowDimensions from '../../services/useWindowDimensions';

import useTradersQuery from '../../services/useTradersQuery';
import ScreenerModes from '../../components/layout/screenerModes';

import {ReactComponent as ComingSoon} from '../../assets/svg/coming-soon.svg';
import fundamentalsListSample from '../../data/fundamentals.json'





const useStyles = makeStyles((theme) => ({
    graphicsTab: {
        display: 'flex',
        height:'30px',
        borderRadius:'10px',
        marginLeft:'10px',
        paddingLeft:'10px',
        paddingRight:'10px',
        textTransform: 'capitalize',
        border: '1px solid #a7a7a7',
        fontSize: '15px',
        alignItems: 'center',
    },
    tabText: {
        marginRight:'10px',
    },
    selectedGraphicsTab: {
        backgroundColor:'rgb(25, 42, 69)'
    }
}));





/***************************************************************************************************
*
*               Fundamentals - Main Feature
*
*****************************************************************************************************/



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


Fundamentals.propTypes = {

};

export default Fundamentals;







// const classicsListColumns = {
//     price:["last", "change", "change_percentage", "volume", "market_cap"],
//     profile:["country", "exchange", "sector", ]
// }






/***************************************************************************************************
*
*               Fundamentals - Classics Feature 
*
*****************************************************************************************************/



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
        const end = query.page.at * query.page.size;
        const start = end - query.page.size;
        const newList = fundamentalsListSample.slice(start, end);

        setClassicsList(newList);
        setPaginationSize(Math.ceil(fundamentalsListSample.length/query.page.size));
        setUpdatedAt("30/05/2022 03:54:04");

    }

    return (
        <React.Fragment>
            <div className='fundamentals-feature-options-bar-container'>
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
            <div className='fundamentals-feature-body-container'>
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












/***************************************************************************************************
*
*               Fundamentals - Graphics Feature 
*
*****************************************************************************************************/





const FundamentalsGraphics = (props) => {
    const classes = useStyles();
    const graphicsItems = ['cap map', 'vol map']
    const [selectedGraphics, setSelectedGraphics] = useState(graphicsItems[0])



    const onChangeGraphics = (select) => {
        setSelectedGraphics(select)
    }

    return (
        <React.Fragment>
            <div className='fundamentals-feature-options-bar-container'>
                {graphicsItems.map((item, i)=>{
                    return (
                        <div key={i} className={`${classes.graphicsTab} ${item == selectedGraphics ? classes.selectedGraphicsTab : ''}`}
                            onClick={()=>onChangeGraphics(item)} >
                            <span className={classes.tabText}>{item}</span>
                            <FaThLarge />
                        </div>)
                })}
            </div>
            <div className='fundamentals-feature-body-container'>
                {selectedGraphics == 'cap map' && <CapMap />}
                {selectedGraphics == 'vol map' && <VolMap />}
            </div>
        </React.Fragment>
    );
};



