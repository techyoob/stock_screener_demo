


// Core
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


// Third party
import { makeStyles } from '@mui/styles';
import Dropdown from "react-overlays/Dropdown";
import { useDropdownMenu, useDropdownToggle } from "react-overlays";





// Application
import { FilterComponent } from '../../components/controls/filter';
import { abbreviateNumber } from '../../util/abbreviateNumber';
import List from '../../components/layout/list';
import Throbber from '../../components/controls/throbber';

import useWindowDimensions from '../../services/useWindowDimensions';

import useTradersQuery from '../../services/useTradersQuery';
import ScreenerModes from '../../components/layout/screenerModes';
import {ReactComponent as ComingSoon} from '../../assets/svg/coming-soon.svg';
import fundamentalsListSample from '../../data/fundamentals.json'


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



Fundamentals.propTypes = {

};

export default Fundamentals;



