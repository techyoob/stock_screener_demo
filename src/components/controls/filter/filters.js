

// Core
import React, { useEffect, useState } from 'react';





// Third
import { 
    FaMapMarkerAlt,
    FaExchangeAlt,
    FaRegMoneyBillAlt,
    FaColumns
  } from 'react-icons/fa';
  




// Application
import { abbreviateNumber } from '../../../util/abbreviateNumber';
import './filter.css';





export const loadFilterComponent = (props) => ({
    "country":<CountryFilter  {...props} />,
    "exchange":<ExchangeFilter {...props} />,
    "market_cap":<MarketCapFilter {...props} />,
    "columns":<ColumnsFilter {...props} />
});





/**********************************************
        Fundamentals Filter Components
***********************************************/



const CountryFilter = (props) => {
    
    const {filterName, filterState, onSetFilterState } = props
    const countries = ['all', 'us', 'canada', 'france'];
    
    const handleCheck = (event) => {
        onSetFilterState({[`profile__${filterName}`]:{"iexact":event.target.value}})
        // setFilterState(event.target.value);
    };

    return (
        <div className='countries-filter-list' >
            {countries.map((country, i)=>{
                
                const isChecked = filterState?.iexact === country

                return (
                    <label className='country-filter-item' key={i}>
                        <input
                            value={country}
                            type="radio"
                            name="countries"
                            onChange={handleCheck}
                            defaultChecked={isChecked}
                        />
                        <span>{country}</span>
                    </label> )
            })}
        </div>
    );
};

const ExchangeFilter = (props) => {

    const exchanges = ['all', 'nasdaq', 'nyse'];
    const {filterName, filterState, onSetFilterState } = props

    const handleChange = (event) => {        
        onSetFilterState({[`profile__${filterName}`]:{"iexact":event.target.value}})
    };

    return (
        <div className='exchange-filter-list' >
            {exchanges.map((exchange, i)=>{
                
                const isChecked = filterState?.iexact === exchange
                return (
                    <label className='exchange-filter-item' key={i}>
                        <input
                            value={exchange}
                            type="radio"
                            name="exchages"
                            onChange={handleChange}
                            defaultChecked={isChecked}
                        />
                        <span>{exchange}</span>
                    </label>
                )
            })}
        </div>
    );
};

const MarketCapFilter = (props) => {

    const { filterName, filterState, onSetFilterState} = props

    const capRanges ={ all:{gte:0, lte:10000000000000},
                       mega:{gte:200000000000, lte:10000000000000},
                       large:{gte:10000000000, lte:199999999999},
                       mid:{gte:2000000000, lte:19999999999},
                       small:{gte:300000000, lte:1999999999},
                       micro:{gte:50000000, lte:299999999},
                       nano:{gte:0, lte:49999999},
                    }

    const handleChange = (event) => {
        onSetFilterState({[`price__${filterName}`]:capRanges[event.target.value]})
    }


    return (
        <div className='market-cap-filter-list'>
            {Object.keys(capRanges).map((range, i)=>{

                const rangeMin = capRanges[range]['gte']
                const rangeMax = capRanges[range]['lte']

                const rangeLabel=`${range} ($${abbreviateNumber(rangeMin)}-${abbreviateNumber(rangeMax)})`
                const isChecked = (filterState?.gte === rangeMin) && (filterState?.lte === rangeMax)

                return (
                    <label className='market-cap-filter-item' key={i}>
                        <input
                            value={range}
                            type="radio"
                            name="marketCap"
                            onChange={handleChange}
                            defaultChecked={isChecked}
                        />
                        <span>{rangeLabel}</span>
                    </label>
                )
            })}
        </div>
    );
};

const ColumnsFilter = (props) => {

    const classicsListColumns = {
        price:["last", "change", "change_percentage", "volume", "market_cap"],
        profile:["country", "exchange", "sector", ]
    }



    const {filterState, onSetFilterState, filterName } = props



    const handleChange = ({type, column, isChecked}) => {

        const nestedValue = type+'__'+column;

        if(isChecked){
            if (!filterState.includes(nestedValue)){

                const newFilterState = [...filterState, nestedValue];
        //         const newFilterState = requiredColumns.concat(newSelectedColumns)
                onSetFilterState(newFilterState);
            }
        } else {
            const filteredArray = filterState.filter(function(e) { return e !== nestedValue })
            onSetFilterState(filteredArray)
        }

    };







    return (
        <div className='columns-filter-list' >
            {Object.keys(classicsListColumns).map((type, i)=>{
                return(
                    <React.Fragment key={i}>
                        <div className='columns-type-section'>
                            {type}
                        </div>
                        {classicsListColumns[type].map((column, j)=>{
                            return (
                                <label className='exchange-filter-item' key={j}>
                                    <input
                                        value={column}
                                        type="checkbox"
                                        name="columns"
                                        onChange={(e)=>handleChange({type, column, isChecked:e.target.checked})}
                                        defaultChecked={filterState.includes(type+'__'+column)}
                                    />
                                    <span>{column.replace(/_/g, ' ')}</span>
                                </label>
                            )
                        })}
                    </React.Fragment>
                )


            })}
        </div>
    );



};
