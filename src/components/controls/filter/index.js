

// Core
import React, { useEffect, useState } from 'react';

// Third party
import Dropdown from "react-overlays/Dropdown";
import { useDropdownMenu, useDropdownToggle } from "react-overlays";
import { 
    FaMapMarkerAlt,
    FaExchangeAlt,
    FaRegMoneyBillAlt,
    FaColumns,
    FaWindowClose
  } from 'react-icons/fa';



// Application
import { loadFilterComponent } from './filters';
import './filter.css'



export const FilterComponent = (props) => {
    const { filterName, filterState, onFilterStateChange } = props
    const [show, setShow] =useState(false)

    const onSetFilterState = (newFilterState) => {        
        onFilterStateChange(newFilterState)
    }

    return (
        <Dropdown
            show={show}
            onToggle={(nextShow) => setShow(nextShow)}
            drop={"down"}
            alignEnd={true}
            itemSelector="button:not(:disabled)">
                <Toggle 
                    id={`${filterName}-filter-toggle-button`}
                    filterName={filterName}/>
                <FilterBody
                    filterName={filterName}
                    filterState={filterState}
                    onSetFilterState={onSetFilterState}/>
        </Dropdown>
    );
};



const FilterBody = (props) => {
    const {filterName, filterState, onSetFilterState} = props;

    const [dropProps, { toggle, show, onClose }]  = useDropdownMenu({
        flip: true,
        offset: [0, 8],
    });



    return (
        <div className="fundamentals-filter-box"
            {...dropProps}>
            <div > <FaWindowClose onClick={()=>toggle(false)} /> </div>
            {loadFilterComponent({filterName, filterState, onSetFilterState})[filterName]}
        </div>
    );
};













// const FilterBody = ({ filterName, onApplyFilter, defaultFilterState }) => {

//     const [filterState, setFilterState]=useState(defaultFilterState)

//     const [props, { toggle, show, onClose }]  = useDropdownMenu({
//         flip: true,
//         offset: [0, 8],
//     });



    
//     const onApply = () => {

//         onApplyFilter(filterState)
//         toggle(false)
//     }

//     const onCancel = () => {

//         // onApplyFilter(filterState)
//         console.log(" canceling is iii  ");
//         toggle(false)
//     }


//     // const onApply = () => {

//     //     onApplyFilter({[filterName]:filterState} )
//     //     toggle(false)
//     // }


//     return (
//         <div 
//             className="fundamentals-filter-body"
//             {...props}>
//                 {loadFilterComponent({filterName, filterState, setFilterState})[filterName]}
//                 <div className='filter-box-footer'>
//                     <div 
//                         className='filter-box-cancel'
//                         onClick={onCancel}>
//                             Cancel
//                     </div>
//                     <div 
//                         className='filter-box-apply'
//                         onClick={onApply}>
//                             Apply
//                     </div>
//                 </div>
//         </div>
//     );
// };

const Toggle = ({ id, filterName }) => {
    const [props, { show, toggle }] = useDropdownToggle();

    return (
        <div 
            className='fundamentals-filter-toggle'
            type="button"
            id={id}
            {...props}>
                {filterLogoSelector[filterName]}
                <span>
                    {filterName.replace(/_/g, ' ')}
                </span>
        </div>
    );
  };


  const filterLogoSelector =  {
    "country":<FaMapMarkerAlt />,
    "exchange":<FaExchangeAlt />,
    "market_cap": <FaRegMoneyBillAlt />,
    "columns":<FaColumns />
}
