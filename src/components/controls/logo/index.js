





// Core
import React from 'react';



// Third



// Application
import useResponsiveDesign from "../../../services/useResponsiveDevice";
import  StockScreenerMd from '../../../assets/png/logo4v113.png';
import  StockScreenerSm from '../../../assets/png/logo4v2.png';
 



const Logo = (props) => {
    const { height } = props;
    const { isSmallScreen, isMidScreen, isLargeScreen } = useResponsiveDesign()




    return (
        <React.Fragment>
            {(isSmallScreen || isMidScreen) && <img src={StockScreenerSm} 
                                                style={{marginLeft:'10px', height:height }} 
                                                alt="stock screener"/>}
            {isLargeScreen && <img src={StockScreenerMd} 
                                                style={{marginLeft:'10px', height:height }} 
                                                alt="stock screener"/>}
        </React.Fragment>
    );
};

export default Logo;






