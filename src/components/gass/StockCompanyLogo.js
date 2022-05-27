







// Core
import React, {useEffect, useState} from 'react';

//  Third Party



// Application
import './gass.css'
import {ReactComponent as GASSLogo} from '../../assets/svg/stock-market.svg';
// import useTradersQuery from '../../services/useTradersQuery';





export const StockCompanyLogo = () => {
    return (
        <div className='company-logo-circled-frame' >
            <GASSLogo width={"55%"} height={"55%"} fill="#796f47"/>
        </div>
    );
};

